import { CategoryDTO } from '@/shared/dtos/categoryDTO';
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

    const categories = data.map(d => CategoryDTO.fromData(d))
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

    return CategoryDTO.fromData(data)
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

    return CategoryDTO.fromData(data)
  }
}