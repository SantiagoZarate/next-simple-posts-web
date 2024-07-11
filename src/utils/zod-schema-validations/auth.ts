import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const signUpSchema = signInSchema.merge(z.object({
  username: z.string()
}))

export type SignInType = z.infer<typeof signInSchema>

export type SignUpType = z.infer<typeof signUpSchema>