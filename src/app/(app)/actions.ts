'use server'

import { ServiceLocator } from "@/services/serviceLocator";
import { createPostSchema } from "../../utils/zod-schema-validations/post";
import { authenticatedProcedure } from "../../utils/zsa-procedures";
import { redirect } from "next/navigation";
import { ZSAError } from "zsa";
import { CreatePostError } from "@/shared/errors/postErrors";

export const createPost = authenticatedProcedure
  .createServerAction()
  .input(createPostSchema)
  .handler(async ({ input }) => {
    console.log("Creando post")
    const postService = ServiceLocator.getService("PostService")

    let newPost;

    try {
      newPost = await postService.create(input)
    } catch (error) {
      if (error instanceof CreatePostError) {
        throw new ZSAError("ERROR", "Error creating post")
      }
      throw new ZSAError("ERROR", error)
    }

    redirect(`/posts/${newPost.id}`)
  })

export const deletePost = authenticatedProcedure
  .createServerAction()
  .handler(async ({ request, ctx }) => {
    const { supabase, user } = ctx

    const paramQuery = request!.url ?? 1

    const { data } = await supabase
      .from("post")
      .delete()
      .eq('id', paramQuery)
  })