import { PostDTO } from "@/dtos/postDTO"
import { createClient } from "@/utils/supabase/server"
import { IPostRepository } from "."
import { PostDelete, PostUpdate, PostInsert } from "@/types/post"

export class PostRepository implements IPostRepository {
  private _db!: ReturnType<typeof createClient>
  private _tableName = "post"

  private constructor(db: ReturnType<typeof createClient>) {
    this._db = db
  }

  static async create(): Promise<PostRepository> {
    return new PostRepository(await createClient());
  }

  delete(id: PostDelete): Promise<PostDTO> {
    throw new Error("Method not implemented.")
  }

  update(id: PostUpdate): Promise<PostDTO> {
    throw new Error("Method not implemented.")
  }

  async create(data: PostInsert) {
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
}