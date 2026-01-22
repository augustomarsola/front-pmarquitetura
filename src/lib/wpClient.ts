import { allTagsSlug } from "./constants";
import { WPPageProps } from "./wpTypes";

export async function getPageBySlug(slug: string): Promise<WPPageProps> {
  const res = await fetch(
    `${process.env.WP_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`,
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
