import client from "../client";
import {
  ChapterResponseSchema,
  type Chapter,
} from "@/types/Story/story.schema";

export const getChapterBySlug = async (
  storySlug: string,
  slug: string
): Promise<Chapter | null> => {
  const chaptersApi = client.collection("story-chapters");
  const result = await chaptersApi.find({
    filters: {
      slug,
      story: {
        slug: storySlug,
      },
    },
    populate: ["story"],
  });
  const parsed = ChapterResponseSchema.safeParse(result);
  if (!parsed.success) {
    throw new Error("Invalid chapter response: " + parsed.error.message);
  }

  return parsed.data.data[0] || null;
};
