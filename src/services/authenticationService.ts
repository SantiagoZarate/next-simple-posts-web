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

  async signIn(credentials: SignInType) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })

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
}

