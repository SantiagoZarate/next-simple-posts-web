import { PostDTO } from "@/dtos/postDTO";
import { PostRepository } from "@/repositories/PostRepository";

export class PostService {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async getAll(): Promise<PostDTO[]> {
    const results = await this._repository.getAll()
    return results
  }
}