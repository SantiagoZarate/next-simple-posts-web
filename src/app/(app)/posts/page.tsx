import { CategoryIcon } from "@/app/components/icons/CategoryIcon";
import { SparkleIcon } from "@/app/components/icons/SparkleIcon";
import { PostsSkeleton } from "@/app/components/post/PostSkeleton";
import { PostsLinkCard } from "@/app/components/post/PostsLinkCard";
import { PostsList } from "@/app/components/post/PostsList";
import { Suspense } from 'react';

export default function BlogsPages() {
  return (
    <section className="grid grid-cols-2  gap-4 grid-rows-4">
      <article className="col-span-2 row-span-3 flex flex-col gap-4">
        <h1 className="text-2xl">Most recent Blogs</h1>
        <Suspense fallback={<PostsSkeleton />}>
          <PostsList />
        </Suspense>
      </article>
      <PostsLinkCard href="/" icon={<SparkleIcon />}>
        Most rated posts
      </PostsLinkCard>
      <PostsLinkCard href="/" icon={<CategoryIcon />}>
        Search by category
      </PostsLinkCard>
    </section>
  )
}