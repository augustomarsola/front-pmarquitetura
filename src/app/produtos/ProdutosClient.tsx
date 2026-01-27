"use client";

import type { PostListItem } from "@/lib/wpTypes";
import Image from "next/image";
import Link from "next/link";

interface ProdutosClientProps {
  produtos: PostListItem[];
}

export function ProdutosClient({ produtos }: ProdutosClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {produtos.map((produto) => (
        <Link
          key={produto.id}
          href={`/produtos/${produto.slug}`}
          className="group block"
        >
          <div className="mb-2 text-right">
            <h3 className="text-[10px] text-gray-600 group-hover:text-gray-900 transition-colors uppercase">
              {produto.title}
            </h3>
          </div>
          {produto.featuredImage && (
            <div className="relative overflow-hidden">
              <Image
                src={produto.featuredImage.src}
                alt={produto.featuredImage.alt || produto.title}
                width={produto.featuredImage.width}
                height={produto.featuredImage.height}
                className="w-full h-55 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
