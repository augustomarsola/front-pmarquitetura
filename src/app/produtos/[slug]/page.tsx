import { CarouselProjeto } from "@/components/CarouselProjeto";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateProjectSchema } from "@/lib/schema";
import { getPostBySlug } from "@/lib/wpClient";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProdutoSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProdutoSlugProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const produto = await getPostBySlug("produtos", slug);

    const categoria = produto.taxonomies.categoria[0]?.name || "";
    const local = produto.taxonomies.local[0]?.name || "";
    const ano = produto.taxonomies.ano[0]?.name || "";

    const description = `${produto.title} - Design de móveis e peças autorais${local ? ` em ${local}` : ""}${ano ? ` - ${ano}` : ""}. ${categoria ? `Categoria: ${categoria}.` : ""} Desenvolvido pelo estúdio PM Arquitetura.`;

    return {
      title: `${produto.title} | Design de Móveis`,
      description,
      keywords: [
        produto.title,
        "design de móveis",
        "peças autorais",
        categoria.toLowerCase(),
        "móveis customizados",
        "pm arquitetura",
      ].filter(Boolean),
      openGraph: {
        title: `${produto.title} | PM Arquitetura`,
        description,
        url: `/produtos/${slug}`,
        images: produto.images.slice(0, 1).map((img) => ({
          url: img.src,
          width: img.width,
          height: img.height,
          alt: img.alt || produto.title,
        })),
      },
    };
  } catch {
    return {
      title: "Produto não encontrado",
    };
  }
}

export default async function ProdutosSlug({ params }: ProdutoSlugProps) {
  const { slug } = await params;

  let produto;
  try {
    produto = await getPostBySlug("produtos", slug);
  } catch {
    notFound();
  }

  // Extrai parágrafos do HTML
  const paragraphRegex = /<p[^>]*>(.*?)<\/p>/g;
  const paragraphs: string[] = [];
  let match;

  while ((match = paragraphRegex.exec(produto.htmlContent)) !== null) {
    const content = match[1].trim();
    if (content && !content.startsWith("id=")) {
      paragraphs.push(content);
    }
  }

  // Primeiros 3 parágrafos em uppercase
  const firstThreeParagraphs = paragraphs.slice(0, 3);
  const remainingContent = produto.htmlContent
    .replace(/<p[^>]*>.*?<\/p>/g, (match) => {
      const index = paragraphs.indexOf(
        match.replace(/<\/?p[^>]*>/g, "").trim(),
      );
      return index < 3 ? "" : match;
    })
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, "") // Remove todas as figuras/imagens
    .replace(/<div[^>]*class="wp-block-group[^"]*"[^>]*>/g, "") // Remove divs do WordPress
    .replace(/<\/div>/g, "")
    .trim();

  return (
    <section className="max-w-5xl mx-auto px-6 pt-10 lg:px-0">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/produtos">Produtos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {produto.taxonomies.categoria.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/produtos">
                    {produto.taxonomies.categoria[0].name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{produto.title}</BreadcrumbPage>
          </BreadcrumbItem>
          {produto.taxonomies.local.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {produto.taxonomies.local[0].name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {produto.taxonomies.ano.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {produto.taxonomies.ano[0].name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Carousel de imagens */}
      {produto.images.length > 0 && (
        <div className="mb-12">
          <CarouselProjeto images={produto.images} />
        </div>
      )}

      {/* Conteúdo do produto */}
      <div className="prose prose-gray max-w-none text-sm">
        {/* Primeiros 3 parágrafos em uppercase com espaçamento maior */}
        {firstThreeParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className="uppercase"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        {/* Resto do conteúdo */}
        {remainingContent && (
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: remainingContent }}
          />
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProjectSchema(produto)),
        }}
      />
    </section>
  );
}
