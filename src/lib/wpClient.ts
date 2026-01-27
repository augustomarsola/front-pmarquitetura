import { allTagsSlug } from "./constants";
import type {
  CarouselImage,
  CarouselItem,
  CarouselLink,
  PageContent,
  PageWithFeaturedImage,
  PostDetail,
  PostListItem,
  PostType,
  Taxonomy,
  WPPageProps,
  WPPost,
} from "./wpTypes";

export async function getPageBySlug(slug: string): Promise<WPPageProps> {
  const res = await fetch(
    `${process.env.WP_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed`,
    {
      next: {
        tags: [allTagsSlug],
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }
  const data = await res.json();
  return data[0];
}

/**
 * Extrai imagens do HTML renderizado do WordPress
 */
function extractImagesFromHTML(html: string): CarouselImage[] {
  const images: CarouselImage[] = [];
  const imgRegex = /<img[^>]*>/g;

  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const imgTag = match[0];

    // Extrai cada atributo individualmente
    const srcMatch = imgTag.match(/src="([^"]*)"/);
    const altMatch = imgTag.match(/alt="([^"]*)"/);
    const widthMatch = imgTag.match(/width="(\d+)"/);
    const heightMatch = imgTag.match(/height="(\d+)"/);

    if (srcMatch && widthMatch && heightMatch) {
      images.push({
        src: srcMatch[1],
        alt: altMatch ? altMatch[1] : "",
        width: parseInt(widthMatch[1], 10),
        height: parseInt(heightMatch[1], 10),
      });
    }
  }

  return images;
}

/**
 * Extrai links do menu de navegação do WordPress
 */
function extractLinksFromHTML(html: string): CarouselLink[] {
  const links: CarouselLink[] = [];
  const linkRegex =
    /<a[^>]+href="([^"]+)"[^>]*>\s*<span[^>]*>([^<]+)<\/span>\s*<\/a>/g;

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    const label = match[2];

    // Extrai o slug do final da URL (última parte antes da barra final)
    const urlParts = url.split("/").filter((part) => part);
    const slug = urlParts[urlParts.length - 1];

    links.push({
      slug,
      label,
    });
  }

  return links;
}

/**
 * Busca os dados da página Home e retorna os itens formatados para o carousel
 */
export async function getHomeCarouselData(): Promise<CarouselItem[]> {
  const page = await getPageBySlug("home");
  const html = page.content.rendered;

  const images = extractImagesFromHTML(html);
  const links = extractLinksFromHTML(html);

  // Combina imagens e links na ordem em que aparecem
  const carouselItems: CarouselItem[] = images.map((image, index) => ({
    image,
    link: links[index] || { slug: "", label: "" }, // Link vazio se não houver correspondência
  }));

  return carouselItems;
}

/**
 * Extrai o conteúdo de uma página (primeira imagem + texto HTML)
 */
export async function getPageContent(slug: string): Promise<PageContent> {
  const page = await getPageBySlug(slug);
  const html = page.content.rendered;

  // Extrai a primeira imagem
  const images = extractImagesFromHTML(html);
  const firstImage = images.length > 0 ? images[0] : null;

  // Remove a primeira tag <figure> que contém a imagem para não duplicar
  const htmlWithoutFirstImage = html.replace(
    /<figure[^>]*>\s*<img[^>]*>\s*<\/figure>/,
    "",
  );

  return {
    image: firstImage,
    htmlContent: htmlWithoutFirstImage,
  };
}

/**
 * Extrai o conteúdo de uma página com featured image
 */
export async function getPageWithFeaturedImage(
  slug: string,
): Promise<PageWithFeaturedImage> {
  const page = await getPageBySlug(slug);
  const html = page.content.rendered;

  // Extrai a featured image do _embedded
  let featuredImage: CarouselImage | null = null;
  if (
    page._embedded &&
    page._embedded["wp:featuredmedia"] &&
    page._embedded["wp:featuredmedia"].length > 0
  ) {
    const media = page._embedded["wp:featuredmedia"][0];
    const fullSize = media.media_details.sizes.full;

    featuredImage = {
      src: fullSize.source_url,
      alt: media.alt_text || "",
      width: fullSize.width,
      height: fullSize.height,
    };
  }

  return {
    featuredImage,
    htmlContent: html,
  };
}

/**
 * Extrai taxonomias de um post do WordPress
 */
function extractTaxonomies(post: WPPost): {
  ano: Taxonomy[];
  categoria: Taxonomy[];
  local: Taxonomy[];
} {
  const taxonomies = {
    ano: [] as Taxonomy[],
    categoria: [] as Taxonomy[],
    local: [] as Taxonomy[],
  };

  if (!post._embedded || !post._embedded["wp:term"]) {
    return taxonomies;
  }

  // wp:term retorna um array de arrays de taxonomias
  const terms = post._embedded["wp:term"];

  for (const termGroup of terms) {
    for (const term of termGroup) {
      if (term.taxonomy === "ano") {
        taxonomies.ano.push(term);
      } else if (term.taxonomy === "categoria") {
        taxonomies.categoria.push(term);
      } else if (term.taxonomy === "local") {
        taxonomies.local.push(term);
      }
    }
  }

  return taxonomies;
}

/**
 * Busca todos os posts de um tipo específico
 */
export async function getAllPosts(postType: PostType): Promise<PostListItem[]> {
  const res = await fetch(
    `${process.env.WP_BASE_URL}/wp-json/wp/v2/${postType}?_embed&orderby=date&order=desc`,
    {
      next: {
        tags: [allTagsSlug],
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${postType}`);
  }

  const posts: WPPost[] = await res.json();

  return posts.map((post) => {
    let featuredImage: CarouselImage | null = null;

    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"].length > 0
    ) {
      const media = post._embedded["wp:featuredmedia"][0];
      featuredImage = {
        src: media.source_url,
        alt: media.alt_text || "",
        width: media.media_details.width,
        height: media.media_details.height,
      };
    }

    return {
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredImage,
      taxonomies: extractTaxonomies(post),
    };
  });
}

/**
 * Busca um post específico por slug e tipo
 */
export async function getPostBySlug(
  postType: PostType,
  slug: string,
): Promise<PostDetail> {
  const res = await fetch(
    `${process.env.WP_BASE_URL}/wp-json/wp/v2/${postType}?slug=${slug}&_embed`,
    {
      next: {
        tags: [allTagsSlug],
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${postType} with slug: ${slug}`);
  }

  const posts: WPPost[] = await res.json();

  if (posts.length === 0) {
    throw new Error(`Post not found: ${slug}`);
  }

  const post = posts[0];
  const html = post.content.rendered;

  // Extrai todas as imagens do conteúdo
  const images = extractImagesFromHTML(html);

  // Remove a galeria de imagens do HTML para separar imagens do texto
  const htmlWithoutGallery = html.replace(
    /<figure class="wp-block-gallery[^>]*>[\s\S]*?<\/figure>/,
    "",
  );

  return {
    title: post.title.rendered,
    slug: post.slug,
    images,
    htmlContent: htmlWithoutGallery,
    taxonomies: extractTaxonomies(post),
  };
}
