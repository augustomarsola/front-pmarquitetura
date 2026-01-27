import { getAllPosts } from "@/lib/wpClient";
import { ProjetosClient } from "./ProjetosClient";

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
