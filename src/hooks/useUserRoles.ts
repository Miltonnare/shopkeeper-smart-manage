import { useAuth, AppRole } from "@/contexts/AuthContext";

export type { AppRole };

/**
 * React hook to fetch the current user's roles from the centralized AuthContext.
 * Returns: { roles, loading, error }
 */
export function useUserRoles() {
  const { roles, loading, error } = useAuth();
  return { roles, loading, error };
}
