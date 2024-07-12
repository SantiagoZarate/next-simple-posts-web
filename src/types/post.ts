import { RawCategory, RawPost } from "./supabase"

export type RawPostWithCategorys = RawPost & {
  category: RawCategory[]
}

export type PostSelect = Pick<RawPost, "title" | "content" | "created_at" | "id">
export type PostInsert = Pick<RawPost, "content" | "title">
export type PostDelete = Pick<RawPost, "id">
export type PostUpdate = Pick<RawPost, "id" | "content" | "title">
export type PostID = Pick<RawPost, "id">
