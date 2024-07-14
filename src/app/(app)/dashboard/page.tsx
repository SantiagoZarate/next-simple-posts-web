import { PostByUserFetcher } from "./PostByUserFetcher";

export default function DashboardPage() {
  return (
    <section className="w-full max-w-screen-lg flex flex-col gap-4">
      <header>
        <h1>Your posts</h1>
      </header>
      <PostByUserFetcher />
    </section>
  )
}