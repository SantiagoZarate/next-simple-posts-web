import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

interface Props {
  username: string
}

export function LoggedSection({ username }: Props) {
  return (
    <section className="flex items-center gap-2">
      <LogoutButton />
      <Link href={"/dashboard"}>
        <p className="text-sm">{username}</p>
      </Link>
    </section>
  )
}
