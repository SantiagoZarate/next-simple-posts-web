import { AuthError } from "@/shared/errors/authErrors";
import { createClient } from "@/utils/supabase/server";
import { SignInType, SignUpType } from "@/utils/zod-schema-validations/auth";

export class AuthenticationService {
  constructor() { }

  async getUser() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw new Error("Error getting user")
    }

    return {
      id: data.user.id,
      role: data.user.role
    }
  }

  async userSession() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error("Error getting user")
    }

    return {
      id: data.session?.user.id
    }
  }

  async signInWithEmail({ email, password }: SignInType) {
    const supabase = await createClient()

    console.log({ email, password })

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log(error)

    if (error) {
      throw new AuthError("Invalid credentials")
    }
  }

  async signUp({ email, password, username }: SignUpType) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    })

    if (error) {
      throw new Error("Authentication error")
    }

    return data
  }

  async logout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error("Ops, there was an error")
    }
  }
}

