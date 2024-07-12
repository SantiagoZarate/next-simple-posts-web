import { RawCategory, RawPost } from "@/types/supabase";
import { CategoryDTO } from "./categoryDTO";
import { RawPostWithCategorys } from "@/types/post";

export class PostDTO {
  constructor(
    private _id: number,
    private _title: string,
    private _content: string,
    private _category: CategoryDTO[]
  ) { }

  public get title() {
    return this._title
  }

  public get category() {
    return this._category
  }

  public get id() {
    return this._id
  }

  public get content() {
    return this._content
  }

  static fromData({ title, content, id, category }: RawPostWithCategorys) {
    return new PostDTO(
      id,
      title,
      content,
      category.map(cat => CategoryDTO.fromData(cat))
    )
  }
}

