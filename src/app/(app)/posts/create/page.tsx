import { Suspense } from "react";
import { FetchCategories } from "./fetchCategories";

export default async function CreatePostPage() {
  return (
    <section className="flex flex-col gap-8">
      <header>
        <h2 className="text-3xl">Create a new post with everybody</h2>
      </header>
      <Suspense fallback={<div className="bg-neutral-400 animate-pulse w-full h-60" />}>
        <FetchCategories />
      </Suspense>
    </section>
  )
}