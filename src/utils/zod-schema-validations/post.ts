import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  })
})

export type CreateaPostSchema = z.infer<typeof createPostSchema>