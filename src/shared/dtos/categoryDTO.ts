import { RawCategory } from "@/types/supabase";

export class CategoryDTO {
  constructor(
    private _name: string
  ) { }

  public get name() {
    return this._name
  }

  static fromData({ name }: RawCategory) {
    console.log("CONVERTING DTO")
    return new CategoryDTO(
      name
    )
  }

  toPlainObject() {
    return {
      name: this._name
    }
  }
}

