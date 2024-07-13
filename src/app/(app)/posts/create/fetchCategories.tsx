import { ServiceLocator } from "@/services/serviceLocator"
import { CreatePostForm } from "./createPost"
import { CategoryDTO } from "@/shared/dtos/categoryDTO"

export async function FetchCategories() {
  const categoryService = ServiceLocator.getService("CategoryService")
  const categories: CategoryDTO[] = await categoryService.getAll()

  return (
    <CreatePostForm categories={categories.map(cat => cat.toPlainObject())} />
  )
}