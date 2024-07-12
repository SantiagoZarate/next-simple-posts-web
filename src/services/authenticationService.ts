import { createClient } from "@/utils/supabase/server";
import { SignInType, SignUpType } from "@/utils/zod-schema-validations/auth";

// interface IAuthenticationService {
//   signIn(data: SignInType): Promise<UserDTO>
//   signUp(data: SignUpType): Promise<>
// }

export class AuthenticationService {
  private _supabase = createClient()

  constructor() { }

  async getUser() {
    const { data } = await this._supabase.auth.getUser()

    if (!data.user) {
      throw new Error("Error getting user")
    }

    return {
      id: data.user.id,
      role: data.user.role
    }
  }

  async signIn({ email, password }: SignInType) {
    const res = await this._supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    return res
  }

  async signUp({ email, password }: SignUpType) {
    const res = await this._supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (res.error) {
      throw new Error("Authentication error")
    }

    return res
  }
}

