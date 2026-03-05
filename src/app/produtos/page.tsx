import { getAllPosts } from "@/lib/wpClient";
import type { Metadata } from "next";
import { ProdutosClient } from "./ProdutosClient";

export async function generateMetadata(): Promise<Metadata> {
  const produtos = await getAllPosts("produtos");
  const firstProduct = produtos[0];

  return {
    title: "Produtos | Design de Móveis e Peças Autorais",
    description:
      "Conheça os produtos e peças autorais desenvolvidos pelo PM Arquitetura. Design de móveis customizados e objetos decorativos exclusivos.",
    keywords: [
      "design de móveis",
      "peças autorais",
      "móveis customizados",
      "design de interiores",
      "decoração",
      "mobiliário autoral",
    ],
    openGraph: {
      title: "Produtos e Peças Autorais | PM Arquitetura",
      description: "Design de móveis customizados e peças autorais exclusivas.",
      url: "/produtos",
      images: firstProduct?.featuredImage
        ? [
            {
              url: firstProduct.featuredImage.src,
              width: firstProduct.featuredImage.width,
              height: firstProduct.featuredImage.height,
              alt:
                firstProduct.featuredImage.alt || "PM Arquitetura - Produtos",
            },
          ]
        : undefined,
    },
  };
}

export default async function Produtos() {
  const produtos = await getAllPosts("produtos");

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-0">
      <ProdutosClient produtos={produtos} />
    </section>
  );
}
