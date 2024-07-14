import { ServiceLocator } from "@/services/serviceLocator"
import { PostsTable } from "./PostsTable"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export async function PostByUserFetcher() {
  const postService = ServiceLocator.getService("PostService")
  const posts = await postService.getByUser()

  return posts.length > 0
    ? <PostsTable posts={posts} />
    :
    <article className="flex flex-col items-center justify-center gap-2">
      <p>It looks like you haven't created any post yet</p>
      <Link href={"/posts/create"}>
        <Button variant={"secondary"}>
          create one!
        </Button>
      </Link>
    </article>
}
