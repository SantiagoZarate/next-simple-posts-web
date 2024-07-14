import { CategoryDTO, categorySchemaDTO } from '@/shared/dtos/categoryDTO';
import { type ICategoryRepository } from '.'
import { createClient } from '@/utils/supabase/server';
import { CategoryDelete, CategoryInsert } from '@/types/category';

export class CategoryRepository implements ICategoryRepository {
  private _tableName: string = "category"

  async getAll() {
    const db = await createClient()

    const { error, data } = await db
      .from(this._tableName)
      .select("*")

    if (error) {
      throw new Error("Error getting all the categories")
    }

    const categories = data.map(d => categorySchemaDTO.parse(d))
    return categories
  }

  async create(newCategory: CategoryInsert): Promise<CategoryDTO> {
    const db = await createClient()

    const { error, data } = await db
      .from(this._tableName)
      .insert(newCategory)
      .select()
      .single()

    if (error) {
      throw new Error("Error getting all the categories")
    }

    return categorySchemaDTO.parse(data)
  }

  async delete({ id }: CategoryDelete): Promise<CategoryDTO> {
    const db = await createClient()
    const { error, data } = await db
      .from(this._tableName)
      .delete()
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error("Error getting all the categories")
    }

    return categorySchemaDTO.parse(data)
  }
}