import Link from "next/link"
import { Button } from "../ui/button"
import { NavLinksBar } from "./NavLinksBar"
import { ServiceLocator } from "@/services/serviceLocator"

export async function Header() {
  const authService = ServiceLocator.getService("AuthenticationService")
  const { id } = await authService.userSession()

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
            id
              ?
              <Link href={'/signup'}>
                <Button>
                  Logout
                </Button>
              </Link>
              :
              <Link href={'/signin'}>
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