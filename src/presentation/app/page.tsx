import { CreatePostForm } from "@/presentation/components/post/CreatePostForm";

export default function HomePage() {
  return (
    <>
      <div className="relative z-20 grid grid-cols-2 gap-8 p-8 max-w-screen-lg ">
        <section className="flex flex-col gap-4">
          <h1 className="font-bold text-6xl">My simple posts nextjs web</h1>
          <p className="text-border">Im using zsa 'Zod Server Actions' to safelly type the inputs</p>
        </section>
        <CreatePostForm />
      </div>
      <div className="hover:opacity-0 duration-1000 pointer-events-none absolute z-10 inset-0 bg-gradient-to-b from-transparent from-30% to-lime-100/30" />
    </>
  )
}