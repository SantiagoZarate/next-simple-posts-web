import { createClient } from "@/utils/supabase/server";
import { SignInType, SignUpType } from "@/utils/zod-schema-validations/auth";

// interface IAuthenticationService {
//   signIn(data: SignInType): Promise<UserDTO>
//   signUp(data: SignUpType): Promise<>
// }

export class AuthenticationService {
  constructor() { }

  async getUser() {
    const supabase = await createClient()

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      throw new Error("Error getting user")
    }

    return {
      id: data.user.id,
      role: data.user.role
    }
  }

  async signIn({ email, password }: SignInType) {
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    return res
  }

  async signUp({ email, password }: SignUpType) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw new Error("Authentication error")
    }

    return data
  }
}

