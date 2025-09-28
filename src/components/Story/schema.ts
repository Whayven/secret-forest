import { z } from "zod";

// Strapi-ish document shape (adjust date fields as strings because the API
// typically returns ISO timestamps).
export const StrapiDocumentSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable().optional(),
});

// Story attributes — `content` can be a string or a rich-text object/AST
// depending on how Strapi is configured, so accept either string or unknown.
export const StorySchema = StrapiDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  content: z.union([z.string(), z.unknown()]),
  categories: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .optional()
    .nullable(),
});

export const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export const StoryResponseSchema = z.object({
  data: z.array(StorySchema),
  meta: z.object({ pagination: PaginationSchema }),
});

export type Story = z.infer<typeof StorySchema>;
export type StoryResponse = z.infer<typeof StoryResponseSchema>;
