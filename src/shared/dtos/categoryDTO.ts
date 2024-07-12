import { RawCategory } from "@/types/supabase";

export class CategoryDTO {
  constructor(
    private _name: string,
  ) { }

  public get name() {
    return this._name
  }

  static fromData({ name }: RawCategory) {
    return new CategoryDTO(
      name
    )
  }
}

