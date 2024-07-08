import { createPostSchema } from "./lib/zod-schema-validations/post";
import { authenticatedProcedure } from "./lib/zsa-procedures";
import { redirect } from "next/navigation";

export const createPost = authenticatedProcedure
  .createServerAction()
  .input(createPostSchema)
  .handler(
    async ({ input, ctx }) => {
      const { user, supabase } = ctx

      const { data, error } = await supabase
        .from("post")
        .insert({
          title: input.title,
          content: input.content
        })
        .select("id")

      if (error) {
        throw new Error("Error while creating post", { cause: error.details })
      }

      console.log("El post que creaste tiene el id: ", data)

      redirect(`/app/post/${data}`)
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