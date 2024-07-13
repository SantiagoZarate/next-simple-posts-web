import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "../ui/button";
import { LoggedSection } from "./LoggedSection";
import { LoginButton } from "./LoginButton";
import { NavLinksBar } from "./NavLinksBar";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="absolute  w-full px-8 py-6">
      <div className="w-full flex justify-between items-center max-w-screen-lg mx-auto">
        <NavLinksBar />
        <div className="flex gap-4">
          <Link href={user === null ? "" : "/posts/create"}>
            <Button disabled={user === null}>
              create post
            </Button>
          </Link>
          {
            user
              ? <LoggedSection username={user.user_metadata.username} />
              : <LoginButton />
          }
        </div>
      </div>
    </header>
  )
}