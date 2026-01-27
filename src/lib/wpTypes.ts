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
    "wp:term"?: Taxonomy[][];
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

// Interfaces para Posts
export interface Taxonomy {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  type: string;
  featured_media: number;
  ano: number[];
  categoria: number[];
  local: number[];
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: Taxonomy[][];
  };
}

export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  featuredImage: CarouselImage | null;
  taxonomies: {
    ano: Taxonomy[];
    categoria: Taxonomy[];
    local: Taxonomy[];
  };
}

export interface PostDetail {
  title: string;
  slug: string;
  images: CarouselImage[];
  htmlContent: string;
  taxonomies: {
    ano: Taxonomy[];
    categoria: Taxonomy[];
    local: Taxonomy[];
  };
}

export type PostType = "projetos" | "produtos" | "publicacoes";
