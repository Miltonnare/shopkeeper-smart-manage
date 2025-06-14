
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "manager" | "sales" | "inventory" | "viewer";

/**
 * React hook to fetch the current user's roles from Supabase.
 * Returns: { roles, loading, error }
 */
export function useUserRoles() {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRoles() {
      setLoading(true);
      setError(null);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setRoles([]);
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) {
          setError(error.message);
          setRoles([]);
        } else {
          setRoles((data ?? []).map(r => r.role));
        }
      } catch (err: any) {
        setError(err?.message || "Unknown error");
        setRoles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
    return () => { isMounted = false; };
  }, []);

  return { roles, loading, error };
}
