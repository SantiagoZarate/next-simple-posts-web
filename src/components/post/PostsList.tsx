'use server'

import { PostService } from "@/services/postService";
import { ServiceLocator } from "@/services/serviceLocator";
import Link from "next/link";

export async function PostsList() {
  const service = await ServiceLocator.getService("PostService")
  const posts = await service.getAll()

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