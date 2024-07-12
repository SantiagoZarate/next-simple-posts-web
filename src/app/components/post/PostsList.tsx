'use server'

import { ServiceLocator } from "@/services/serviceLocator";
import Link from "next/link";

export async function PostsList() {
  const postService = await ServiceLocator.getService("PostService")
  const posts = await postService.getAll()

  return (
    <ul className="flex flex-col gap-2">
      {
        posts?.map(post => (
          <Link
            className="hover:-translate-y-1 transition"
            href={'/posts/' + post.id}
          >
            {post.title}
          </Link>
        ))
      }
    </ul>
  )
}