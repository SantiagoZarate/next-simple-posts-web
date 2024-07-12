import { login } from "@/presentation/app/actions"

export async function CreatePostServer() {
  return (
    <form action={login}>
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="content" placeholder="content" />
      <button>post!</button>
    </form>
  )
}
