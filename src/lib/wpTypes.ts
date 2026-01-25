export interface FeaturedMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface FeaturedMedia {
  id: number;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      full: FeaturedMediaSize;
    };
  };
  source_url: string;
}

export interface WPPageProps {
  content: {
    rendered: string;
  };
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
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

export interface PageContent {
  image: CarouselImage | null;
  htmlContent: string;
}

export interface PageWithFeaturedImage {
  featuredImage: CarouselImage | null;
  htmlContent: string;
}
