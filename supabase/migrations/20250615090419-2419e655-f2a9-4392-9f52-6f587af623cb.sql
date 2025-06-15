
-- Allow admin to view all sales in the sales table
CREATE POLICY "Admins view all sales"
  ON public.sales
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR public.has_role(auth.uid(), 'admin')
  );

-- (Leaves the existing user-only policy in place, so both the user and any admins can view)
