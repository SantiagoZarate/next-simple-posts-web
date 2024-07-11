import { IPostDTO } from "@/dtos"
import { createClient } from "@/utils/supabase/server"
import { } from '@supabase/ssr'

export class PostRepository {
  private _db: ReturnType<typeof createClient>
  private _tableName = "post"

  constructor() {
    this._db = createClient()
  }

  async create(data: IPostDTO) {
    const res = await this._db
      .from(this._tableName)
      .insert(data)
      .select()
      .single()

    if (res.error) {
      throw new Error("Error creating a new post")
    }

    return res.data
  }

  async getAll() {
    const res = await this._db
      .from(this._tableName)
      .select("*")

    if (res.error) {
      throw new Error("Error creating a new post")
    }

    return res.data
  }
}