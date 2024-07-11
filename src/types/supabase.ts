import { Database } from "../../supabase/types.gen";

export type RawPost = Database["public"]["Tables"]["post"]["Row"]
export type RawCategory = Database["public"]["Tables"]["category"]["Row"]