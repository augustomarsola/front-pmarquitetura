// Cache tags para revalidação
export const CACHE_TAGS = {
  SITE: "site", // Tag global para revalidar todo o site
  PAGES: "pages",
  PROJECTS: "projects",
  PRODUCTS: "products",
  PUBLICATIONS: "publications",
} as const;

// Helper para criar tag de página específica
export const getPageTag = (slug: string) => `page:${slug}`;

// Helper para criar tag de projeto específico
export const getProjectTag = (slug: string) => `project:${slug}`;

// Helper para criar tag de produto específico
export const getProductTag = (slug: string) => `product:${slug}`;

// Legacy (manter para compatibilidade se necessário)
export const allTagsSlug = CACHE_TAGS.SITE;
