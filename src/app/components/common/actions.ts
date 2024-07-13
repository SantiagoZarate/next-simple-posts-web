"use server"

import { ServiceLocator } from "@/services/serviceLocator"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function logout() {
  console.log("DESLOGUEANDO")

  const authService = ServiceLocator.getService("AuthenticationService")

  try {
    await authService.logout()
  } catch (error) {
    console.log(error)
  }

  revalidatePath("/", "layout")
  redirect("/")
}