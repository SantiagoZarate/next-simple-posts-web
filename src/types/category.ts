import { RawCategory } from './supabase'

export type CategoryInsert = Pick<RawCategory, "name">
export type CategoryDelete = Pick<RawCategory, "id">