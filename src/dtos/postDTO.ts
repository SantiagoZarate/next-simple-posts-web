import { RawPost } from "@/types/supabase";
import { IPostDTO } from ".";

export class PostDTO {
  private _title: string
  private _content: string

  constructor({ title, content }: RawPost) {
    this._title = title
    this._content = content
  }

  public get title() {
    return this._title
  }

  public get content() {
    return this._content
  }

  static fromData(data: RawPost): IPostDTO {
    return new PostDTO(data)
  }
}

