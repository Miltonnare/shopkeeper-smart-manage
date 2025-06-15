
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Returns users (id and maybe email) that have sales
export function useAllUsersWithSales() {
  return useQuery({
    queryKey: ["users-with-sales"],
    queryFn: async () => {
      // Find distinct user_ids in sales
      const { data, error } = await supabase
        .from("sales")
        .select("user_id")
        .neq("user_id", null)
        .group("user_id");
      if (error) throw new Error(error.message);

      // Try to get their emails from profiles (if exists)
      const userIds = data.map((u: { user_id: string }) => u.user_id);
      if (userIds.length === 0) return [];
      // Load profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", userIds);

      return userIds.map(id => {
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
