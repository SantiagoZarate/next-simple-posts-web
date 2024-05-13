import { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata : Metadata = {
  title : "Blogs page"
}

export default function BlogsLayout({children} : PropsWithChildren){
  return(
    <section className="w-full px-8 max-w-screen-md">
      {children}
    </section>
  )
}