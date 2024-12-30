export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          event_date: string
          package_choice: 'photobooth-only' | 'photobooth-soda' | 'photobooth-bartender'
          notes: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          event_date: string
          package_choice: 'photobooth-only' | 'photobooth-soda' | 'photobooth-bartender'
          notes?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          event_date?: string
          package_choice?: 'photobooth-only' | 'photobooth-soda' | 'photobooth-bartender'
          notes?: string | null
          status?: string
          created_at?: string
        }
      }
    }
  }
}