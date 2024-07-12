import { PostService } from "./postService"
import { AuthenticationService } from "./authenticationService"
import { PostRepository } from "@/repository/PostRepository";

interface ServiceMap {
  PostService: PostService;
  AuthenticationService: AuthenticationService;
};

interface RepositoryMap {
  PostRepository: PostRepository
}

export class ServiceLocator {
  private static _serviceCache: Partial<Record<keyof ServiceMap, any>> = {}
  private static _repositoryCache: Partial<Record<keyof RepositoryMap, any>> = {}

  private static _serviceFactory: { [K in keyof ServiceMap]: () => ServiceMap[K] } = {
    AuthenticationService: () => new AuthenticationService(),
    PostService: () => {
      const postRepository = this.getOrCreateRepository("PostRepository");
      return new PostService(postRepository);
    }
  }

  private static _repositoryFactory: { [K in keyof RepositoryMap]: () => RepositoryMap[K] } = {
    PostRepository: () => new PostRepository()
  }

  private static getOrCreateRepository<T extends keyof RepositoryMap>(repositoryName: T) {
    let repository = this._repositoryCache[repositoryName]

    if (repository) {
      console.log("Returning cached repository")
      return repository
    }

    console.log("Creating repository and saving it to cache")
    repository = this._repositoryFactory[repositoryName]
    this._repositoryCache[repositoryName] = repository
    return repository
  }

  static getService<T extends keyof ServiceMap>(serviceName: T): ServiceMap[T] {
    let service = this._serviceCache[serviceName]

    if (service) {
      // Returning cached service
      return service;
    }

    // Service needs to be created and then cached for further service requests
    service = this._serviceFactory[serviceName]()
    this._serviceCache[serviceName] = service
    return service
  }
}