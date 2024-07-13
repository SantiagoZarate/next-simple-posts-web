import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20)
})

export const signUpSchema = signInSchema.merge(z.object({
  username: z.string()
}))

export type SignInType = z.infer<typeof signInSchema>

export type SignUpType = z.infer<typeof signUpSchema>