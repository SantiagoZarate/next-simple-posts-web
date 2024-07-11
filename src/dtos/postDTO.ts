import { RawPost } from "@/types/supabase";

export class PostDTO {
  constructor(
    private _title: string,
    private _content: string
  ) { }

  public get title() {
    return this._title
  }

  public get content() {
    return this._content
  }

  static fromData({ title, content }: RawPost) {
    return new PostDTO(
      title,
      content
    )
  }
}

