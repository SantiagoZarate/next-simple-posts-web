import { PostDTO } from "@/shared/dtos/postDTO";
import { PostInsert, PostDelete, PostUpdate } from "@/types/post";

export interface IPostRepository {
  getAll(): Promise<PostDTO[]>

  create(data: PostInsert, userID: string): Promise<PostDTO>

  delete(id: PostDelete): Promise<PostDTO>

  update(id: Pick<PostDTO, "id">, newData: PostInsert): Promise<PostDTO>

  getById(id: Pick<PostDTO, "id">): Promise<PostDTO>
}