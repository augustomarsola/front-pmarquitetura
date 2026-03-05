import { CarouselHome } from "@/components/CarouselHome";
import { getHomeCarouselData } from "@/lib/wpClient";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const carouselItems = await getHomeCarouselData();
  const firstImage = carouselItems[0]?.image;

  return {
    title: "Home",
    description:
      "Explore o portfólio completo do PM Arquitetura. Projetos residenciais, comerciais e design de interiores com atendimento personalizado e atenção aos detalhes.",
    openGraph: {
      title: "PM Arquitetura | Portfólio de Projetos de Arquitetura",
      description:
        "Explore nosso portfólio de projetos residenciais, comerciais e design de interiores.",
      url: "/",
      images: firstImage
        ? [
            {
              url: firstImage.src,
              width: firstImage.width,
              height: firstImage.height,
              alt: firstImage.alt || "PM Arquitetura",
            },
          ]
        : undefined,
    },
  };
}

export default async function Home() {
  const carouselItems = await getHomeCarouselData();

  return (
    <section className="w-full max-w-5xl mx-auto">
      <CarouselHome items={carouselItems} />
    </section>
  );
}
