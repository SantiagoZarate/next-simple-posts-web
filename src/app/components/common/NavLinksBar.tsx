'use client'

import { links } from "@/app/data/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinksBar() {
  const currentLocation = usePathname();

  return (
    <nav className="flex gap-4">
      {
        links.map(link => (
          <Link
            key={link.value}
            href={link.path}
            className={`text-sm capitalize py-2 hover:-translate-y-[2px] transition ${currentLocation === link.path && "border-b border-foreground"}`}>
            {link.value}
          </Link>
        ))
      }
    </nav>
  )
}