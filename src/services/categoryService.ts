import { CategoryDTO } from "@/shared/dtos/categoryDTO"
import { CategoryDelete, CategoryInsert } from "@/types/category"

export class CategoryService {
  private _repository: CategoryService

  constructor(repository: CategoryService) {
    this._repository = repository
  }

  async create(data: CategoryInsert): Promise<CategoryDTO> {
    const result = await this._repository.create(data)
    return result
  }

  async delete({ id }: CategoryDelete): Promise<CategoryDTO> {
    const result = await this._repository.delete({ id })
    return result;
  }

  async getAll(): Promise<CategoryDTO[]> {
    const results = await this._repository.getAll()
    return results
  }
}

