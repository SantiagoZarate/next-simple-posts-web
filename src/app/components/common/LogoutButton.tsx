'use server'

import { Button } from "../ui/button";
import { logout } from "./actions";

export async function LogoutButton() {
  return (
    <form action={logout}>
      <Button>
        Logout
      </Button>
    </form>
  )
}
