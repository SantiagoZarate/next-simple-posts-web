"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useServerAction } from 'zsa-react'

import { createPost } from '@/app/(app)/actions'
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
import { MultiSelect } from "@/app/components/ui/multi-select"
import { toast } from "@/app/components/ui/use-toast"
import { CategoryDTO } from "@/shared/dtos/categoryDTO"
import { CreateaPostSchema, createPostSchema } from "@/utils/zod-schema-validations/post"
import { Fish } from "lucide-react"
import { useState } from "react"

interface Props {
  categories: ReturnType<CategoryDTO["toPlainObject"]>[]
}

export function CreatePostForm({ categories }: Props) {
  const categoriesList = categories.map(cat => ({
    value: cat.name,
    label: cat.name,
    icon: Fish
  }))

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const form = useForm<CreateaPostSchema>({
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

        <MultiSelect
          options={categoriesList}
          onValueChange={setSelectedCategories}
          defaultValue={selectedCategories}
          placeholder="Select frameworks"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}