"use server"

import { ZSAError, createServerAction } from 'zsa'
import { signUpSchema } from '@/utils/zod-schema-validations/auth'
import { ServiceLocator } from '@/services/serviceLocator'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const signup = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    const authService = ServiceLocator.getService("AuthenticationService")

    try {
      authService.signUp(input)
    } catch (error) {
      throw new ZSAError("ERROR", error)
    }

    revalidatePath("/", "layout")
    redirect("/")
  })