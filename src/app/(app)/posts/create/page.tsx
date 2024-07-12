"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from 'zsa-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { createPostSchema } from "@/utils/zod-schema-validations/post"
import { createPost } from '@/app/(app)/actions'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { toast } from "@/app/components/ui/use-toast"

type FormSchemaType = z.infer<typeof createPostSchema>

export default function CreatePostPage() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  const { execute } = useServerAction(createPost, {
    onError: ({ err }) => {
      toast({ title: err.message })
    },
    onSuccess: () => {
      toast({ title: "Post created succesfully" })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="the greatest title ever written" {...field} />
              </FormControl>
              <FormDescription>
                This is your post title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>content</FormLabel>
              <FormControl>
                <Input placeholder="this is my new article" {...field} />
              </FormControl>
              <FormDescription>
                This is your post body.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}