"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useServerAction } from 'zsa-react'

import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { toast } from "@/app/components/ui/use-toast"
import { SignInType } from "@/utils/zod-schema-validations/auth"
import { createPostSchema } from "@/utils/zod-schema-validations/post"
import { login } from "./actions"
import Link from "next/link"

export default function LoginPage() {
  const form = useForm<SignInType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { execute } = useServerAction(login, {
    onError: ({ err }) => {
      toast({ title: err.message })
    },
    onSuccess: () => {
      toast({ title: "Logged in" })
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="lionelmessi@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormDescription>
                  This is your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <footer className="flex justify-center">
        <Link href={"/signup"}>
          <p className="hover:underline">You dont have an account?, sign up!</p>
        </Link>
      </footer>
    </div>
  )
}

