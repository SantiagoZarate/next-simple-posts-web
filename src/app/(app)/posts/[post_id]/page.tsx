import { ServiceLocator } from "@/services/serviceLocator";

interface Props {
  params: {
    post_id: string
  }
}

export default async function PostPage({ params }: Props) {
  const postService = ServiceLocator.getService("PostService")
  const { category, content, id, title } = await postService.getByID({ id: Number(params.post_id) })

  console.log(params.post_id)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-pretty text-center">
        {title}
      </h1>
      <ul className="flex gap-2">
        {category?.map(category => (
          <span id={category.name} className="text-xs bg-neutral-100 border border-border rounded-full px-4 py-2 w-fit">
            {category.name}
          </span>
        ))}
      </ul>
      <p className="text-justify">
        {content}
      </p>
    </div>
  )
}