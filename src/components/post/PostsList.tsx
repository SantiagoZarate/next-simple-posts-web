'use server'

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function PostsList() {
  const supabase = await createClient()

  let { data: post, error } = await supabase
    .from('post')
    .select('*')

  console.log(post)

  if (error) {
    redirect("/")
  }

  return (
    <ul className="flex flex-col gap-2">
      {
        post?.map(post => (
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