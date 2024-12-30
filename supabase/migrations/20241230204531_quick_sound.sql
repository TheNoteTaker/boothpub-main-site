/*
  # Initial Schema Setup for Booth Pub

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `event_date` (timestamptz)
      - `package_choice` (text)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `status` (text) - For tracking booking status
    
  2. Security
    - Enable RLS on `bookings` table
    - Add policies for:
      - Public can create bookings
      - Only authenticated users (admin) can read all bookings
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_date timestamptz NOT NULL,
  package_choice text NOT NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_package CHECK (package_choice IN ('photobooth-only', 'photobooth-soda', 'photobooth-bartender'))
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users" ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);