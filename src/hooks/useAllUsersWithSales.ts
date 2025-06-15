
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Returns users (id and maybe email) that have sales
export function useAllUsersWithSales() {
  return useQuery({
    queryKey: ["users-with-sales"],
    queryFn: async () => {
      // Find user_ids in sales
      const { data, error } = await supabase
        .from("sales")
        .select("user_id")
        .neq("user_id", null);

      if (error) throw new Error(error.message);

      // Deduplicate user_ids
      const uniqueUserIds = Array.from(
        new Set((data ?? []).map((u: { user_id: string }) => u.user_id))
      );

      if (uniqueUserIds.length === 0) return [];

      // Load profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", uniqueUserIds);

      return uniqueUserIds.map(id => {
        const profile = profiles?.find((p: any) => p.id === id);
        return {
          id,
          name: profile
            ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || id
            : id,
        };
      });
    },
  });
}
