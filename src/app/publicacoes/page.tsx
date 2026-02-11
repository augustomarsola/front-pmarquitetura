import { getAllPosts } from "@/lib/wpClient";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Publicações | Notícias e Artigos PM Arquitetura",
  description:
    "Acompanhe as publicações, notícias e artigos do estúdio PM Arquitetura. Fique por dentro de nossos projetos mais recentes e tendências de arquitetura.",
  keywords: [
    "publicações arquitetura",
    "notícias arquitetura",
    "artigos design",
    "blog arquitetura",
    "tendências arquitetura",
  ],
  openGraph: {
    title: "Publicações | PM Arquitetura",
    description:
      "Notícias, artigos e atualizações sobre nossos projetos e tendências de arquitetura.",
    url: "/publicacoes",
  },
};

export default async function Publicacoes() {
  const publicacoes = await getAllPosts("publicacoes");

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {publicacoes.map((publicacao) => (
          <div key={publicacao.id} className="group block">
            {publicacao.featuredImage && (
              <div className="relative overflow-hidden">
                <Image
                  src={publicacao.featuredImage.src}
                  alt={publicacao.featuredImage.alt || publicacao.title}
                  width={publicacao.featuredImage.width}
                  height={publicacao.featuredImage.height}
                  className="w-full h-auto"
                />
              </div>
            )}
            <div className="mt-2">
              <h3
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: publicacao.title }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
