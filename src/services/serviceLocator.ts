import { PostRepository } from "@/repositories/PostRepository"
import { PostService } from "./postService"
import { AuthenticationService } from "./authenticationService"

type ServiceInstances = {
  PostService: PostService;
  AuthenticationService: AuthenticationService;
};

export class ServiceLocator {
  private static _services: Partial<ServiceInstances> = {}

  static async getService<T extends keyof ServiceInstances>(svc: T): Promise<ServiceInstances[T]> {
    if (this._services[svc]) {
      // Service had been already created and its retrieved from cache
      return this._services[svc] as ServiceInstances[T];
    }

    // Service needs to be created and then cached for further service requests
    if (svc === "PostService") {
      const postRepository = await PostRepository.create();
      const postService = new PostService(postRepository);
      this._services[svc] = postService as ServiceInstances[T];
      return postService as ServiceInstances[T];
    }

    if (svc === "AuthenticationService") {
      const authService = new AuthenticationService()
      this._services[svc] = authService as ServiceInstances[T]
      return authService as ServiceInstances[T];
    }
    throw new Error(`Service ${svc} not recognized`);
  }
}