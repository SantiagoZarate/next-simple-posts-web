import { envs } from "@/config/envs";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    envs.SUPABASE_URL,
    envs.SUPABASE_ANON_KEY,
  );
