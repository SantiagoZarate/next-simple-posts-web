import { CategoryDTO } from "@/shared/dtos/categoryDTO";
import { PostDTO } from "@/shared/dtos/postDTO";
import { CategoryDelete, CategoryInsert } from "@/types/category";
import { PostDelete, PostInsert } from "@/types/post";
import { create } from "domain";

export interface IPostRepository {
  getAll(): Promise<PostDTO[]>

  create(data: PostInsert, userID: string): Promise<PostDTO>

  delete(id: PostDelete): Promise<PostDTO>

  update(id: Pick<PostDTO, "id">, newData: PostInsert): Promise<PostDTO>

  getById(id: Pick<PostDTO, "id">): Promise<PostDTO>
}

export interface ICategoryRepository {
  getAll(): Promise<CategoryDTO[]>

  create(data: CategoryInsert): Promise<CategoryDTO>

  delete(data: CategoryDelete): Promise<CategoryDTO>
}