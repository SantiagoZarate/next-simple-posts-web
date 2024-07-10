import { Database } from "../../supabase/types.gen";

export type Post = Database["public"]["Tables"]["post"]["Row"]
export type Category = Database["public"]["Tables"]["category"]["Row"]