import { createServerActionProcedure } from 'zsa'
import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'
import { PostRepository } from '@/repositories/PostRepository'
import { PostService } from '@/services/postService'
import { AuthenticationService } from '@/services/authenticationService'

export const baseProcedure = createServerActionProcedure()
  .handler(() => {
    // Init post service
    const postRepository = new PostRepository()
    const postService = new PostService(postRepository);

    // Init auth service

    const authService = new AuthenticationService()

    return { postService, authService }
  })

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