
-- Create the sales table to track all sales per product and user
CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Optional: Save snapshot of product prices at sale time
  product_name TEXT,
  unit_price NUMERIC,

  -- Foreign keys
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Enable Row Level Security
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own sales
CREATE POLICY "Users can view their sales" ON public.sales
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert sales for themselves
CREATE POLICY "Users can record their sales" ON public.sales
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update/delete only their sales
CREATE POLICY "Users can update their sales" ON public.sales
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their sales" ON public.sales
  FOR DELETE USING (auth.uid() = user_id);
