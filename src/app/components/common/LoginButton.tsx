import Link from "next/link";
import { Button } from "../ui/button";

export function LoginButton() {
  return (
    <Link href={'/login'}>
      <Button>
        Login
      </Button>
    </Link>
  )
}
