import Link from "next/link"
import { Button } from "../ui/button"
import { NavLinksBar } from "./NavLinksBar"

export function Header() {
  return (
    <header className="absolute  w-full px-8 py-6">
      <div className="w-full flex justify-between items-center max-w-screen-lg mx-auto">
        <NavLinksBar />
        <div>
          <Link href={'/signin'}>
            <Button>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}