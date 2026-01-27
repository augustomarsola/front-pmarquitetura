"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PostListItem } from "@/lib/wpTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjetosClientProps {
  projetos: PostListItem[];
  categorias: Array<{ id: number; name: string }>;
}

export function ProjetosClient({ projetos, categorias }: ProjetosClientProps) {
  const [selectedTab, setSelectedTab] = useState("todos");

  // Filtra projetos baseado na categoria selecionada
  const projetosFiltrados =
    selectedTab === "todos"
      ? projetos
      : projetos.filter((projeto) =>
          projeto.taxonomies.categoria.some(
            (cat) => cat.id === parseInt(selectedTab),
          ),
        );

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList variant="line" className="mb-4">
        <TabsTrigger value="todos" className="text-xs">
          TODOS
        </TabsTrigger>
        {categorias.map((categoria) => (
          <TabsTrigger
            key={categoria.id}
            value={categoria.id.toString()}
            className="text-xs"
          >
            {categoria.name.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        value={selectedTab}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500"
      >
        {projetosFiltrados.map((projeto) => (
          <Link
            key={projeto.id}
            href={`/produtos/${projeto.slug}`}
            className="group block"
          >
            <div className="mb-2 text-right">
              <h3 className="text-[10px] text-gray-600 group-hover:text-gray-900 transition-colors uppercase">
                {projeto.title}
              </h3>
            </div>
            {projeto.featuredImage && (
              <div className="relative overflow-hidden">
                <Image
                  src={projeto.featuredImage.src}
                  alt={projeto.featuredImage.alt || projeto.title}
                  width={projeto.featuredImage.width}
                  height={projeto.featuredImage.height}
                  className="w-full h-55 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </Link>
        ))}
      </TabsContent>
    </Tabs>
  );
}
