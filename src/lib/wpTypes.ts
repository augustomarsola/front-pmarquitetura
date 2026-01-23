export interface WPPageProps {
  content: {
    rendered: string;
  };
}

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CarouselLink {
  slug: string;
  label: string;
}

export interface CarouselItem {
  image: CarouselImage;
  link: CarouselLink;
}
