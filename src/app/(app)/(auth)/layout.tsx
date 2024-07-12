import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-5 w-full max-w-screen-lg">
      <section className="col-span-3">
        <p className="text-3xl">Join this new community</p>
      </section>
      <div className="col-span-2">
        {children}
      </div>
    </div>
  )
}