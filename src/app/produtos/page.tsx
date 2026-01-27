import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllPosts } from "@/lib/wpClient";
import { ProjetosClient } from "../projetos/ProjetosClient";

export default async function Produtos() {
  const projetos = await getAllPosts("produtos");

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
    <section className="max-w-5xl mx-auto px-6 pt-10 lg:px-0">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/produtos">Produtos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>PM ARQUITETURA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjetosClient projetos={projetos} categorias={categorias} />
    </section>
  );
}
