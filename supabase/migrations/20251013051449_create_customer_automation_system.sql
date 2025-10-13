/*
  # Customer Automation System

  ## Overview
  This migration creates a complete customer management and automation system for AI-powered email campaigns and workflow automation.

  ## 1. New Tables

  ### `customers`
  Core customer information storage
  - `id` (uuid, primary key) - Unique customer identifier
  - `email` (text, unique, required) - Customer email address
  - `first_name` (text) - Customer first name
  - `last_name` (text) - Customer last name
  - `phone` (text) - Contact phone number
  - `company` (text) - Company name
  - `status` (text) - Customer status (active, inactive, prospect)
  - `tags` (text array) - Categorization tags for segmentation
  - `metadata` (jsonb) - Flexible storage for custom fields
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `email_campaigns`
  Track email campaigns and automation
  - `id` (uuid, primary key) - Unique campaign identifier
  - `name` (text, required) - Campaign name
  - `subject` (text, required) - Email subject line
  - `content` (text, required) - Email body content
  - `status` (text) - Campaign status (draft, scheduled, sent, paused)
  - `scheduled_for` (timestamptz) - Scheduled send time
  - `sent_at` (timestamptz) - Actual send timestamp
  - `target_tags` (text array) - Customer tags to target
  - `ai_personalized` (boolean) - Whether AI personalization is enabled
  - `created_by` (uuid) - User who created the campaign
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `customer_interactions`
  Log all customer interactions for AI context
  - `id` (uuid, primary key) - Unique interaction identifier
  - `customer_id` (uuid, foreign key) - Reference to customer
  - `interaction_type` (text) - Type (email_sent, email_opened, link_clicked, purchase, support_ticket)
  - `description` (text) - Interaction details
  - `metadata` (jsonb) - Additional structured data
  - `created_at` (timestamptz) - When interaction occurred

  ## 2. Security
  - Enable RLS on all tables
  - Policies for authenticated users to manage their own data
  - Policies for viewing customer data
  - Policies for managing campaigns and interactions

  ## 3. Important Notes
  - Customer emails must be unique
  - Status defaults to 'prospect' for new customers
  - Campaigns default to 'draft' status
  - All timestamps are automatically managed
  - Tags enable flexible customer segmentation
  - JSONB metadata fields allow extension without schema changes
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  phone text DEFAULT '',
  company text DEFAULT '',
  status text DEFAULT 'prospect',
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create email campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'draft',
  scheduled_for timestamptz,
  sent_at timestamptz,
  target_tags text[] DEFAULT '{}',
  ai_personalized boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create customer interactions table
CREATE TABLE IF NOT EXISTS customer_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  interaction_type text NOT NULL,
  description text DEFAULT '',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_interactions ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Authenticated users can view all customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Email campaigns policies
CREATE POLICY "Authenticated users can view all campaigns"
  ON email_campaigns FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create campaigns"
  ON email_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their campaigns"
  ON email_campaigns FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can delete their campaigns"
  ON email_campaigns FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Customer interactions policies
CREATE POLICY "Authenticated users can view all interactions"
  ON customer_interactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create interactions"
  ON customer_interactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_tags ON customers USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled ON email_campaigns(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_interactions_customer ON customer_interactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON customer_interactions(interaction_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON email_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();