import { Post } from "@/types/post";

interface Props {
  params: {
    post_id: string
  }
}

export default async function PostPage({ params }: Props) {
  const data = await fetch("https://dummyjson.com/posts/" + params.post_id);
  const post: Post = await data.json();

  console.log(params.post_id)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-pretty text-center">
        {post.title}
      </h1>
      <p className="text-justify">
        {post.body}
      </p>
    </div>
  )
}