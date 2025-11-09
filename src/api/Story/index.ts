import client from "../client";
import { StoryResponseSchema, type Story } from "@/types/Story/story.schema";

export const getStories = async (): Promise<Story[]> => {
  const storiesAPi = client.collection("stories");
  const result = await storiesAPi.find({ populate: ["chapters"] });

  // Validate the runtime response with Zod. `result` is expected to match
  // the `StoryResponseSchema` shape: { data: Story[], meta: { pagination } }
  const parsed = StoryResponseSchema.safeParse(result);
  if (!parsed.success) {
    // Throw with helpful message for debugging; callers can catch this.
    throw new Error("Invalid stories response: " + parsed.error.message);
  }

  // Return the validated data array
  return parsed.data.data;
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  const storiesAPi = client.collection("stories");
  const result = await storiesAPi.find({
    filters: { slug },
    populate: ["chapters"],
  });

  // Validate the runtime response with Zod. `result` is expected to match
  // the `StoryResponseSchema` shape: { data: Story[], meta: { pagination } }
  const parsed = StoryResponseSchema.safeParse(result);
  if (!parsed.success) {
    // Throw with helpful message for debugging; callers can catch this.
    throw new Error("Invalid story response: " + parsed.error.message);
  }

  // Return the first matching story or null if none found
  return parsed.data.data.length > 0 ? parsed.data.data[0] : null;
};
