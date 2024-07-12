import { PostDTO } from "@/shared/dtos/postDTO"
import { PostDelete, PostInsert } from "@/types/post"
import { createClient } from "@/utils/supabase/server"
import { IPostRepository } from "."

export class PostRepository implements IPostRepository {
  private _tableName = "post"

  constructor() { }

  async delete({ id }: PostDelete): Promise<PostDTO> {
    const db = await createClient()
    const { data, error } = await db
      .from(this._tableName)
      .delete()
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error("Error while deleting post")
    }

    return PostDTO.fromData(data)
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
      throw new Error("Error while trying to update post")
    }

    return PostDTO.fromData(data)
  }

  async create(data: PostInsert, userID: string) {
    const db = await createClient()

    const res = await db
      .from(this._tableName)
      .insert(data)
      .select()
      .single()

    if (res.error) {
      throw new Error("Error creating a new post")
    }

    return PostDTO.fromData(res.data)
  }

  async getAll() {
    const db = await createClient()

    const res = await db
      .from(this._tableName)
      .select("*")

    if (res.error) {
      throw new Error("Error while getting posts")
    }

    const posts: PostDTO[] = res.data.map(post => PostDTO.fromData(post))
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

    return data.map(post => PostDTO.fromData(post))
  }

  async getById({ id }: Pick<PostDTO, "id">): Promise<PostDTO> {
    const db = await createClient()
    const { data, error } = await db
      .from(this._tableName)
      .select("*")
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error("Error while getting post by id")
    }

    return PostDTO.fromData(data)
  }
}