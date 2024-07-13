'use server'

import { ServiceLocator } from '@/services/serviceLocator';
import { AuthError } from '@/shared/errors/authErrors';
import { signInSchema } from '@/utils/zod-schema-validations/auth';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZSAError, createServerAction } from 'zsa';

export const login = createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    const authService = ServiceLocator.getService("AuthenticationService")

    console.log(input)
    try {
      await authService.signIn(input)
    } catch (error) {
      if (error instanceof AuthError) {
        throw new ZSAError("ERROR", "Invalid credentials, cause: " + error)
      }
      throw new ZSAError("ERROR", error)
    }

    revalidatePath('/', 'layout')
    redirect('/')
  })