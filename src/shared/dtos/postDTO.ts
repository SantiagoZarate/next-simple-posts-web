import { RawPostWithCategorys } from "@/types/post";
import { CategoryDTO } from "./categoryDTO";

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
    const mappedCategories = category?.map(cat => CategoryDTO.fromData(cat))
    console.log("Mapping objects")
    return new PostDTO(
      id,
      title,
      content,
      mappedCategories
    )
  }
}

