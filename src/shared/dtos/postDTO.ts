import { RawPost } from "@/types/supabase";

export class PostDTO {
  constructor(
    private _id: number,
    private _title: string,
    private _content: string
  ) { }

  public get title() {
    return this._title
  }

  public get id() {
    return this._id
  }

  public get content() {
    return this._content
  }

  static fromData({ title, content, id }: RawPost) {
    return new PostDTO(
      id,
      title,
      content,
    )
  }
}

