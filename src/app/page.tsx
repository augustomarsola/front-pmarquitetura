import { CarouselHome } from "@/components/CarouselHome";
import { getHomeCarouselData } from "@/lib/wpClient";

export default async function Home() {
  const carouselItems = await getHomeCarouselData();

  return (
    <section className="w-full max-w-5xl mx-auto">
      <CarouselHome items={carouselItems} />
    </section>
  );
}
