
-- 1. Add an 'active' column (default true) to user_roles table
ALTER TABLE public.user_roles ADD COLUMN active boolean NOT NULL DEFAULT true;

-- 2. Update RLS policies to allow only admins to update, insert, or delete any user_roles
-- (Existing policies only allow users to modify their own roles; we need admin-only privileges)

-- First, drop the current policies (names may differ; adjust as needed)
DROP POLICY IF EXISTS "Users can assign their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete their own roles" ON public.user_roles;

-- Only admins can manage user_roles
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can add user roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Regular users can see their own roles (but not manage user_roles)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

