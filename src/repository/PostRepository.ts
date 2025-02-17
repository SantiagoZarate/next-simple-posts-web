import { PostDTO, postSchemaDTO, postWithCategorysDTO } from "@/shared/dtos/postDTO"
import { PostDelete, PostInsert } from "@/types/post"
import { createClient } from "@/utils/supabase/server"
import { IPostRepository } from "."
import { ERROR_CODES, SupabaseErrorCode } from "@/shared/errors/errorCodes"

export class PostRepository implements IPostRepository {
  private _tableName = "post"

  constructor() { }

  async getByUser(userID: string): Promise<PostDTO[]> {
    const db = await createClient()
    const { data, error } = await db
      .from(this._tableName)
      .select("*")
      .eq("created_by", userID)

    if (error) {
      throw new Error("There was an error getting posts from user")
    }

    return data.map(d => postSchemaDTO.parse(d))
  }

  async delete({ id }: PostDelete): Promise<PostDTO> {
    const db = await createClient()
    const { data, error } = await db
      .from(this._tableName)
      .delete()
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.log(error)
      throw new Error("Error while deleting post")
    }

    return postSchemaDTO.parse(data)
  }

  async update({ id }: Pick<PostDTO, "id">, newData: PostInsert): Promise<PostDTO> {
    const db = await createClient()

    const { error, data } = await db.
      from(this._tableName)
      .update(newData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      switch (error.code as SupabaseErrorCode) {
        case "PGRST116":
          throw new Error("Error while trying to update post")
        default:
          throw new Error("Error while trying to update post")
      }
    }

    return postSchemaDTO.parse(data)
  }

  async create(newPost: PostInsert, userID: string) {
    const db = await createClient()
    console.log("Inserting new post")

    const postrRes = await db
      .from("post")
      .insert({
        content: newPost.content,
        title: newPost.title,
        created_by: userID
      })
      .select("*")
      .single()
      .then((postRes) => {
        newPost.category.forEach(async (category) => {
          const categoryRes = await db
            .from("category")
            .select("*")
            .eq("name", category)
            .single()

          const postCategoryRes = await db
            .from('post_category')
            .insert([{
              post_id: postRes.data.id,
              category_id: categoryRes.data.id
            }])
        })
        return postRes
      })

    if (postrRes.error) {
      throw new Error("Error creating a new post")
    }

    return postSchemaDTO.parse(postrRes.data)
  }

  async getAll() {
    const db = await createClient()

    const res = await db
      .from(this._tableName)
      .select("*")

    if (res.error) {
      throw new Error("Error while getting posts")
    }

    await console.log(res.data)
    const posts: PostDTO[] = res.data.map(post => postSchemaDTO.parse(post))
    return posts
  }

  async getAllByQuery(query: string) {
    const db = await createClient()

    const { data, error } = await db
      .from(this._tableName)
      .select("*")
      .like("title", `%${query}%`)

    if (error) {
      throw new Error("Error while getting posts by query")
    }

    return data.map(post => postSchemaDTO.parse(post))
  }

  async getById({ id }: Pick<PostDTO, "id">): Promise<PostDTO> {
    const db = await createClient()

    const { data, error } = await db
      .from(this._tableName)
      .select("*,category(*)")
      .eq("id", id)
      .single()

    if (error) {
      throw new Error("Error while getting post by id")
    }

    console.log(data)

    return postWithCategorysDTO.parse(data)
  }
}