import { CACHE_TAGS } from "@/lib/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Rate limiting simples por IP (em memória)
// Em produção, considere usar Redis ou similar
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  MAX_REQUESTS: 5, // máximo de requests
  WINDOW_MS: 60000, // janela de 1 minuto
};

function getRateLimitKey(request: NextRequest): string {
  // Tenta pegar o IP real do cliente (considerando proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return `ratelimit:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Cria novo registro ou reseta se a janela expirou
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.WINDOW_MS,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
    return false; // Rate limit excedido
  }

  record.count++;
  return true;
}

function isValidRedirect(redirect: string | null): boolean {
  if (!redirect) return true; // null é válido (usará default)

  // Bloquear open redirect
  // Apenas permitir caminhos internos que começam com /
  // Rejeitar // (protocol-relative), http://, https://
  if (
    redirect.startsWith("//") ||
    redirect.startsWith("http://") ||
    redirect.startsWith("https://") ||
    !redirect.startsWith("/")
  ) {
    return false;
  }

  return true;
}

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Limpar o mapa de rate limit a cada 5 minutos
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);

export async function GET(request: NextRequest) {
  try {
    // 1. Verificar rate limit
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      });
    }

    // 2. Validar secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const redirect = searchParams.get("redirect");

    const expectedSecret = process.env.REVALIDATE_SECRET;

    // Verificar se o secret existe e tem tamanho mínimo
    if (!expectedSecret || expectedSecret.length < 32) {
      console.error(
        "REVALIDATE_SECRET not configured or too short (min 32 chars)",
      );
      return new NextResponse("Server configuration error", { status: 500 });
    }

    // Verificar se o secret foi fornecido
    if (!secret) {
      return new NextResponse("Missing secret parameter", { status: 401 });
    }

    // Comparar secrets (timing-safe comparison seria ideal, mas para simplicidade...)
    if (secret !== expectedSecret) {
      // Não logar o secret fornecido por segurança
      return new NextResponse("Invalid secret", { status: 401 });
    }

    // 3. Validar redirect (proteção contra open redirect)
    if (!isValidRedirect(redirect)) {
      console.warn(`Blocked invalid redirect attempt: ${redirect}`);
      // Redirecionar para home em caso de tentativa maliciosa
      return NextResponse.redirect(new URL("/", request.url), 302);
    }

    // 4. Revalidar cache
    console.log("Starting cache revalidation...");

    // Estratégia 1: Invalidar tag global (atinge TODAS as páginas)
    // Usando { expire: 0 } para forçar invalidação imediata
    revalidateTag(CACHE_TAGS.SITE, { expire: 0 });
    console.log(`Revalidated tag: ${CACHE_TAGS.SITE}`);

    // Estratégia 2: Invalidar tags específicas por tipo
    revalidateTag(CACHE_TAGS.PAGES, { expire: 0 });
    revalidateTag(CACHE_TAGS.PROJECTS, { expire: 0 });
    revalidateTag(CACHE_TAGS.PRODUCTS, { expire: 0 });
    revalidateTag(CACHE_TAGS.PUBLICATIONS, { expire: 0 });
    console.log("Revalidated all specific tags");

    // Estratégia 3: Forçar regeneração das rotas principais
    const mainPaths = [
      "/",
      "/sobre",
      "/contato",
      "/projetos",
      "/produtos",
      "/publicacoes",
    ];

    for (const path of mainPaths) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    // Também revalidar as rotas dinâmicas (layout e page)
    revalidatePath("/projetos/[slug]", "page");
    revalidatePath("/produtos/[slug]", "page");
    revalidatePath("/projetos", "layout");
    revalidatePath("/produtos", "layout");
    revalidatePath("/publicacoes", "layout");
    console.log("Revalidated dynamic routes");

    console.log("Cache revalidation completed successfully");

    // 5. Redirecionar
    const redirectPath = redirect || "/";
    const redirectUrl = new URL(redirectPath, request.url);

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error("Error during revalidation:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Bloquear outros métodos HTTP
export async function POST() {
  return new NextResponse("Method not allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method not allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method not allowed", { status: 405 });
}
