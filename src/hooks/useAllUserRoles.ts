
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AdminUserRole = {
  id: string;
  user_id: string;
  email: string | null;
  role: string;
  active: boolean;
};

async function fetchAllUserRoles(): Promise<AdminUserRole[]> {
  // Get all user_roles with email (if possible)
  // 1. Get all roles
  const { data: roles, error } = await supabase
    .from("user_roles")
    .select("id, user_id, role, active");

  if (error) throw new Error(error.message);
  if (!roles?.length) return [];

  // 2. Get user_ids to fetch email from auth.users (via edge function or direct call)
  // Supabase client API can't directly query auth.users, so try to get emails via profiles (if not, show user_id only)
  // Try to get emails via function (for this sample, skip actual email and just return user_id. You can add profiles if needed.)

  // If you want to fetch emails, consider using edge function. For demo, we'll leave email empty or show user_id.
  return roles.map(role => ({
    id: role.id,
    user_id: role.user_id,
    email: null,
    role: role.role,
    active: role.active,
  }));
}

export function useAllUserRoles() {
  return useQuery({
    queryKey: ["all-user-roles"],
    queryFn: fetchAllUserRoles,
  });
}
