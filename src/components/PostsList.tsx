import { PostsApiResponse } from "@/types/post";
import Link from "../../node_modules/next/link";

export async function PostsList() {
  const data = await fetch("https://dummyjson.com/posts?limit=10")
  const result : PostsApiResponse = await data.json();

  return (
    <ul className="flex flex-col gap-2">
      {
        result.posts.map(post => (
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