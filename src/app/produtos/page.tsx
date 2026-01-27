import { getAllPosts } from "@/lib/wpClient";
import { ProdutosClient } from "./ProdutosClient";

export default async function Produtos() {
  const produtos = await getAllPosts("produtos");

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-0">
      <ProdutosClient produtos={produtos} />
    </section>
  );
}
