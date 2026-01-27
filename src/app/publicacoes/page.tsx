import { getAllPosts } from "@/lib/wpClient";
import Image from "next/image";

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
