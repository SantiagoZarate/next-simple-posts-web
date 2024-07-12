'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = createClient()
  console.log("Corriendo action")
  console.log()
  console.log()

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  }

  const { error } = await supabase
    .from('post')
    .insert(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}