import client from "../client";
import { StoryResponseSchema, type Story } from "../../components/Story/schema";

export const getStories = async (): Promise<Story[]> => {
  const storiesAPi = await client.collection("stories");
  const result = await storiesAPi.find();

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
