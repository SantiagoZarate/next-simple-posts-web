import { z } from 'zod';
import { categorySchemaDTO } from "./categoryDTO";

export const postSchemaDTO = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_by: z.string(),
})

export const postWithCategorysDTO = postSchemaDTO.extend({
  category: z.array(categorySchemaDTO),
})

export type PostDTO = z.infer<typeof postSchemaDTO>

export type PostWithCategoryDTO = z.infer<typeof postWithCategorysDTO>