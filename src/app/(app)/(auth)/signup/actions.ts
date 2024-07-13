"use server"

import { ServiceLocator } from '@/services/serviceLocator'
import { signUpSchema } from '@/utils/zod-schema-validations/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ZSAError, createServerAction } from 'zsa'

export const signup = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    console.log(input)
    const authService = ServiceLocator.getService("AuthenticationService")

    try {
      await authService.signUp(input)
    } catch (error) {
      throw new ZSAError("ERROR", error)
    }

    revalidatePath("/", "layout")
    redirect("/")
  })