"use client";

import type { CarouselImage } from "@/lib/wpTypes";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface CarouselProjetoProps {
  images: CarouselImage[];
}

export function CarouselProjeto({ images }: CarouselProjetoProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleApiChange = (api: CarouselApi) => {
    setApi(api);
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  };

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
        setApi={handleApiChange}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto max-h-150 object-contain"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-lg:left-0 h-10 rounded-sm opacity-80 cursor-pointer w-10 border-transparent" />
        <CarouselNext className="max-lg:right-0 h-10 rounded-sm opacity-80 cursor-pointer w-10 border-transparent" />
      </Carousel>

      {/* Indicadores (bolinhas) */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === current ? "bg-gray-900 w-6" : "bg-gray-400"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
