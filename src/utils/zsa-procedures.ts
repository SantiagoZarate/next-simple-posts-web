import { createServerActionProcedure } from 'zsa'
import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      redirect("/signin")
    }

    return { user, supabase }
  }
)