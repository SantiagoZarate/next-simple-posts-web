import { PostDTO } from "@/shared/dtos/postDTO"
import { PostDelete, PostInsert } from "@/types/post"
import { createClient } from "@/utils/supabase/server"
import { IPostRepository } from "."

export class PostRepository implements IPostRepository {
  private _db: ReturnType<typeof createClient>
  private _tableName = "post"

  constructor() {
    this._db = createClient()
  }

  async delete({ id }: PostDelete): Promise<PostDTO> {
    const { data, error } = await this._db
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
    const { error, data } = await this._db.
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
    const res = await this._db
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
    const res = await this._db
      .from(this._tableName)
      .select("*")

    if (res.error) {
      throw new Error("Error while getting posts")
    }

    const posts: PostDTO[] = res.data.map(post => PostDTO.fromData(post))
    return posts
  }

  async getById({ id }: Pick<PostDTO, "id">): Promise<PostDTO> {
    const { data, error } = await this._db
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