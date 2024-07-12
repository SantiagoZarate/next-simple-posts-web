'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'
import { PropsWithChildren } from "react";

export function PostSearcher({ children }: PropsWithChildren) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChangeInput = useDebouncedCallback((input: string) => {
    const params = new URLSearchParams(searchParams)

    if (input) {
      params.set("query", input)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <section className="border border-border rounded-lg p-2 flex flex-col gap-2">
      <input
        type="text"
        className="bg-neutral-200 w-full px-4 py-2 rounded-full"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleChangeInput(e.target.value)} />
      {children}
    </section>
  )
}
