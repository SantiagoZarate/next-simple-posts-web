import { PostDTO } from "@/dtos/postDTO";
import { PostInsert, PostDelete, PostUpdate } from "@/types/post";

export interface IPostRepository {
  getAll(): Promise<PostDTO[]>

  create(data: PostInsert): Promise<PostDTO>

  delete(id: PostDelete): Promise<PostDTO>

  update(id: PostUpdate): Promise<PostDTO>
}