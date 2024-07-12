import { PostRepository } from "@/repository/PostRepository";
import { PostDTO } from "@/shared/dtos/postDTO";
import { PostDelete, PostID, PostInsert, PostUpdate } from "@/types/post";
import { AuthenticationService } from "./authenticationService";
import { ServiceLocator } from "./serviceLocator";

export class PostService {
  private _postRepository: PostRepository
  private _authService: AuthenticationService

  constructor(repository: PostRepository) {
    this._postRepository = repository
    this._authService = ServiceLocator.getService("AuthenticationService")
  }

  async getAll(): Promise<PostDTO[]> {
    const results = await this._postRepository.getAll()
    return results
  }

  async getAllByQuery(query: string): Promise<PostDTO[]> {
    const results = await this._postRepository.getAllByQuery(query)
    return results
  }

  async delete({ id }: PostDelete): Promise<PostDTO> {
    const post = await this.getPostForUser({ id });
    const results = await this._postRepository.delete({ id: post.id })
    return results
  }

  async getPostForUser({ id }: PostID) {
    const user = await this._authService.getUser()
    const post = await this._postRepository.getById({ id })

    // TODO: add property to post to know if user created it
    // if (post.created_by !== user) {
    //   throw new Error("Bad Request: invalid credentials")
    // }

    return post
  }

  async create(data: PostInsert) {
    const user = await this._authService.getUser()
    const results = await this._postRepository.create(data, user.id)
    return results
  }

  async update({ content, id, title }: PostUpdate) {
    const oldPost = await this.getPostForUser({ id })

    const newPost: PostInsert = {
      content: content ?? oldPost.content,
      title: title ?? oldPost.title
    }

    const updatedPost = await this._postRepository.update({ id }, newPost)
    return updatedPost;
  }
}