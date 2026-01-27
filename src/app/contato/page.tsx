import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPageWithFeaturedImage } from "@/lib/wpClient";
import Image from "next/image";
import Link from "next/link";

export default async function Contato() {
  const pageData = await getPageWithFeaturedImage("contato");

  return (
    <section className="max-w-5xl mx-auto px-6 pt-10 lg:px-0">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href="/contato">Contato</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>PM ARQUITETURA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Imagem destacada no topo */}
      {pageData.featuredImage && (
        <div className="w-full mb-12">
          <Image
            src={pageData.featuredImage.src}
            alt={pageData.featuredImage.alt}
            width={pageData.featuredImage.width}
            height={pageData.featuredImage.height}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Informações de contato */}
      <div
        className="prose prose-gray max-w-none text-center"
        dangerouslySetInnerHTML={{ __html: pageData.htmlContent }}
      />
    </section>
  );
}
