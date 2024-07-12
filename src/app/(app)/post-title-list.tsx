import { ServiceLocator } from "@/services/serviceLocator"
import Link from "next/link"

interface Props {
  query: string
}

export async function PostTitleList({ query }: Props) {
  console.log("Query es;", query)
  const postService = ServiceLocator.getService("PostService")
  const postsTitles = await postService.getAllByQuery(query)

  return (
    <ul className="flex flex-col gap-2">
      {postsTitles.map(post => (
        <li className="hover:-translate-y-1 transition-transform" key={post.id}>
          <Link className="" href={`/posts/${post.id}`}>
            <p className="p-2 bg-neutral-100 rounded-lg capitalize">{post.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}