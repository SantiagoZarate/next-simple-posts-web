import { PostDTO } from "@/shared/dtos/postDTO"
import Link from "next/link"
import { deletePost } from "./actions"

interface Props {
  posts: PostDTO[]
}

export async function PostsTable({ posts }: Props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {
            posts?.map(post => (
              <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </th>
                <td className="px-6 py-4">
                  {post.id}
                </td>
                <td className="px-6 py-4">
                  <form key={post.id} action={deletePost}>
                    <input name="id" defaultValue={post.id} hidden type="text" />
                    <button className="text-xs rounded-full px-4 py-2 bg-destructive bg-red-200 uppercase font-bold">
                      delete
                    </button>
                  </form>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
