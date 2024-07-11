'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signInSchema, signUpSchema } from "./utils/zod-schema-validations/auth";
import { baseProcedure } from "./utils/zsa-procedures";
import { ZSAError } from 'zsa'

export const signIn = baseProcedure
  .createServerAction()
  .input(signInSchema)
  .handler(async ({ input, ctx }) => {
    const res = await ctx.authService.signIn(input)

    if (res.error) {
      throw new ZSAError("ERROR", res.error)
    }

    revalidatePath('/', 'layout')
    redirect('/')
  })

export const signUp = baseProcedure
  .createServerAction()
  .input(signUpSchema)
  .handler(async ({ input, ctx }) => {
    const res = await ctx.authService.signUp(input)

    if (res.error) {
      throw new ZSAError("ERROR")
    }

    revalidatePath('/', 'layout')
    redirect('/')
  })