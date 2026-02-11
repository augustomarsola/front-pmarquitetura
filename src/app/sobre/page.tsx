import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPageContent } from "@/lib/wpClient";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre | Conheça o Estúdio PM Arquitetura",
  description:
    "Fundado em 2007 por Paulo Mencarini, o PM Arquitetura desenvolve projetos de arquitetura e design de interiores com atendimento personalizado. Conheça nossa história e equipe.",
  keywords: [
    "sobre pm arquitetura",
    "paulo mencarini arquiteto",
    "lucas navarro arquiteto",
    "estúdio de arquitetura são paulo",
    "arquitetura contemporânea",
  ],
  openGraph: {
    title: "Sobre o PM Arquitetura | Estúdio de Arquitetura em São Paulo",
    description:
      "Conheça a história do estúdio fundado em 2007 e nossa equipe de arquitetos especializados em projetos personalizados.",
    url: "/sobre",
  },
};

export default async function Sobre() {
  const pageData = await getPageContent("sobre");

  return (
    <section className="max-w-5xl mx-auto px-6 pt-10 lg:px-0">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href="/sobre">Sobre</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>PM ARQUITETURA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {pageData.image && (
          <div className="w-full">
            <Image
              src={pageData.image.src}
              alt={pageData.image.alt}
              width={pageData.image.width}
              height={pageData.image.height}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
        <div
          className="prose prose-gray max-w-none text-sm pt-8 space-y-4"
          dangerouslySetInnerHTML={{ __html: pageData.htmlContent }}
        />
      </div>
    </section>
  );
}
