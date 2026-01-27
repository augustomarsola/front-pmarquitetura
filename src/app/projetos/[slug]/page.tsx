import { CarouselProjeto } from "@/components/CarouselProjeto";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostBySlug } from "@/lib/wpClient";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjetoSlugProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjetosSlug({ params }: ProjetoSlugProps) {
  const { slug } = await params;

  let projeto;
  try {
    projeto = await getPostBySlug("projetos", slug);
  } catch (error) {
    notFound();
  }

  // Extrai parágrafos do HTML
  const paragraphRegex = /<p[^>]*>(.*?)<\/p>/g;
  const paragraphs: string[] = [];
  let match;

  while ((match = paragraphRegex.exec(projeto.htmlContent)) !== null) {
    const content = match[1].trim();
    if (content && !content.startsWith("id=")) {
      paragraphs.push(content);
    }
  }

  // Primeiros 3 parágrafos em uppercase
  const firstThreeParagraphs = paragraphs.slice(0, 3);
  const remainingContent = projeto.htmlContent
    .replace(/<p[^>]*>.*?<\/p>/g, (match, offset) => {
      const index = paragraphs.indexOf(
        match.replace(/<\/?p[^>]*>/g, "").trim(),
      );
      return index < 3 ? "" : match;
    })
    .replace(/<figure[^>]*>.*?<\/figure>/g, "") // Remove todas as figuras/imagens
    .replace(/<div[^>]*class="wp-block-group[^"]*"[^>]*>/g, "") // Remove divs do WordPress
    .replace(/<\/div>/g, "")
    .trim();

  return (
    <section className="max-w-5xl mx-auto px-6 pt-10 lg:px-0">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projetos">Projetos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {projeto.taxonomies.categoria.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/projetos">
                    {projeto.taxonomies.categoria[0].name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{projeto.title}</BreadcrumbPage>
          </BreadcrumbItem>
          {projeto.taxonomies.local.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {projeto.taxonomies.local[0].name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {projeto.taxonomies.ano.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {projeto.taxonomies.ano[0].name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Carousel de imagens */}
      {projeto.images.length > 0 && (
        <div className="mb-12">
          <CarouselProjeto images={projeto.images} />
        </div>
      )}

      {/* Conteúdo do projeto */}
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
    </section>
  );
}
