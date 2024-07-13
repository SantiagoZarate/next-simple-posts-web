import Link from "next/link"
import { Button } from "../ui/button"
import { NavLinksBar } from "./NavLinksBar"
import { ServiceLocator } from "@/services/serviceLocator"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function Header() {
  // const authService = ServiceLocator.getService("AuthenticationService")
  // const { id } = await authService.userSession()
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  const isLogged = data.user !== null
  console.log(data.user)

  return (
    <header className="absolute  w-full px-8 py-6">
      <div className="w-full flex justify-between items-center max-w-screen-lg mx-auto">
        <NavLinksBar />
        <div className="flex gap-4">
          <Link href={"/posts/create"}>
            <Button>
              create post
            </Button>
          </Link>
          {
            isLogged
              ?
              <Link href={'/signup'}>
                <Button>
                  Logout
                </Button>
              </Link>
              :
              <Link href={'/login'}>
                <Button>
                  Login
                </Button>
              </Link>
          }
        </div>
      </div>
    </header>
  )
}