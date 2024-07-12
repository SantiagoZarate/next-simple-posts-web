"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useServerAction } from 'zsa-react'

import { Button } from "@/presentation/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form"
import { Input } from "@/presentation/components/ui/input"
import { createPostSchema } from "@/utils/zod-schema-validations/post"
import { createPost } from "@/actions"

type FormSchemaType = z.infer<typeof createPostSchema>

export function CreatePostForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })

  const { execute } = useServerAction(createPost, {
    onError: () => {
      console.log("There was an error")
    },
    onSuccess: () => {
      console.log("Post created succesfully")
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