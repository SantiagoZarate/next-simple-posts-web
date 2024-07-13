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
import { SignUpType, signUpSchema } from "@/utils/zod-schema-validations/auth"
import Link from "next/link"
import { signup } from "./actions"

export default function SignUpPage() {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: ""
    }
  })

  const { execute, isPending } = useServerAction(signup, {
    onError: ({ err }) => {
      toast({ title: err.message })
    },
    onSuccess: () => {
      toast({ title: "Signed up!" })
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => execute(data))} className="space-y-8">
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="lionel_messi_10" {...field} />
                </FormControl>
                <FormDescription>
                  This is your username
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {
              isPending
                ? "Sending..."
                : "Submit"
            }
          </Button>
        </form>
      </Form>
      <footer className="flex justify-center">
        <Link href={"/signin"}>
          <p className="hover:underline">You already have an account?, sign in!</p>
        </Link>
      </footer>
    </div>
  )
}

