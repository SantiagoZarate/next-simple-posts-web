import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types/post";
import { cookies } from "next/headers";
import Link from "next/link";

export async function PostsList() {
  const cookiesStore = cookies()
  const supabase = createClient(cookiesStore)
  const res = await supabase.from('post').select()
  const data = res.data as Post[]

  return (
    <ul className="flex flex-col gap-2">
      {
        data?.map(post => (
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