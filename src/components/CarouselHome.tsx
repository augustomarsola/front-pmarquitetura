"use client";
import type { CarouselItem } from "@/lib/wpTypes";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem as CarouselSlide,
} from "./ui/carousel";

interface CarouselHomeProps {
  items: CarouselItem[];
}

export function CarouselHome({ items }: CarouselHomeProps) {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[Fade(), Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselSlide key={index}>
            <div className="relative">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="w-full h-auto object-cover"
                priority={index === 0}
              />
              {item.link.slug && (
                <div className="py-2 bg-gray-200 text-end pr-22 after:content-[''] after:block after:w-10 after:h-10 after:bg-gray-300 after:absolute after:bottom-0 after:right-0 relative before:content[''] before:block before:w-10 before:h-10 before:bg-gray-300 before:absolute before:bottom-0 before:left-0">
                  <Link
                    href={`/projetos/${item.link.slug}`}
                    className="text-gray-900 hover:text-gray-600 transition-colors uppercase text-xs"
                  >
                    {item.link.label}
                    <Plus
                      className="inline-block size-4 ml-5 -mt-1"
                      strokeWidth={5}
                    />
                  </Link>
                </div>
              )}
            </div>
          </CarouselSlide>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 h-full rounded-none opacity-50 cursor-pointer w-10 border-transparent" />
      <CarouselNext className="right-0 h-full rounded-none opacity-50 cursor-pointer w-10 border-transparent" />
    </Carousel>
  );
}
