import { allTagsSlug } from "@/lib/constants";
import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag(allTagsSlug, "max");
  return new Response("");
}
