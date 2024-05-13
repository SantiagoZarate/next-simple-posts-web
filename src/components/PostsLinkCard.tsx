import { PropsWithChildren } from "react";
import Link from "../../node_modules/next/link";

interface Props extends PropsWithChildren {
  icon: JSX.Element,
  href: string
}

export function PostsLinkCard({ href, icon, children }: Props) {
  return (
    <Link href={href} className="relative rounded-xl border border-border p-2 shadow-sm hover:-translate-y-1 transition hover:shadow-xl">
      {children}
      <div className="absolute bottom-0 left-0 p-2">
        {icon}
      </div>
    </Link>
  )
}