'use server'

import { ServiceLocator } from '@/services/serviceLocator';
import { signInSchema } from '@/utils/zod-schema-validations/auth';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZSAError, createServerAction } from 'zsa';

export const login = createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    const authService = ServiceLocator.getService("AuthenticationService")

    try {
      authService.signIn(input)
    } catch (error) {
      throw new ZSAError("ERROR", error)
    }

    revalidatePath('/', 'layout')
    redirect('/')
  })