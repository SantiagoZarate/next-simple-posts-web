import { IPostDTO } from "@/dtos";
import { PostDTO } from "@/dtos/postDTO";
import { PostRepository } from "@/repositories/PostRepository";

export class PostService {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async getAll(): Promise<IPostDTO[]> {
    const rawPosts = await this._repository.getAll()
    return rawPosts.map(rawPost => PostDTO.fromData(rawPost))
  }
}