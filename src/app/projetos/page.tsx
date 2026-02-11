import { getAllPosts } from "@/lib/wpClient";
import type { Metadata } from "next";
import { ProjetosClient } from "./ProjetosClient";

export const metadata: Metadata = {
  title: "Projetos | Portfólio de Arquitetura PM Arquitetura",
  description:
    "Explore nosso portfólio completo de projetos de arquitetura residencial, comercial e corporativa. Projetos contemporâneos e minimalistas desenvolvidos em São Paulo.",
  keywords: [
    "projetos arquitetura",
    "portfólio arquitetura",
    "projetos residenciais",
    "projetos comerciais",
    "arquitetura contemporânea",
    "obras pm arquitetura",
  ],
  openGraph: {
    title: "Projetos de Arquitetura | PM Arquitetura",
    description:
      "Conheça nosso portfólio completo de projetos residenciais, comerciais e corporativos.",
    url: "/projetos",
  },
};

export default async function Projetos() {
  const projetos = await getAllPosts("projetos");

  // Extrai categorias únicas
  const categoriasSet = new Set<string>();
  const categoriasMap = new Map<string, { id: number; name: string }>();

  projetos.forEach((projeto) => {
    projeto.taxonomies.categoria.forEach((cat) => {
      if (!categoriasSet.has(cat.slug)) {
        categoriasSet.add(cat.slug);
        categoriasMap.set(cat.slug, { id: cat.id, name: cat.name });
      }
    });
  });

  const categorias = Array.from(categoriasMap.values());

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-0">
      <ProjetosClient projetos={projetos} categorias={categorias} />
    </section>
  );
}
