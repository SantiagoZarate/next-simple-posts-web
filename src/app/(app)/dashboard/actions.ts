'use server'

import { ZSAError, createServerAction } from "zsa"
import { z } from 'zod'
import { ServiceLocator } from "@/services/serviceLocator"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function deletePost(formData: FormData) {
  const postService = ServiceLocator.getService("PostService")
  const id = Number(formData.get("id")!);

  try {
    await postService.delete({ id })
  } catch (error) {
    throw new ZSAError("ERROR", error)
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}