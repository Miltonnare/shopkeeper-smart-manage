import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type AppRole = "admin" | "manager" | "sales" | "inventory" | "viewer";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasRole: (allowedRoles: AppRole[]) => boolean;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async (userId: string) => {
    try {
      const { data, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("active", true); // Only load roles that are active

      if (rolesError) {
        throw rolesError;
      }
      if (data) {
        setRoles(data.map((r: { role: AppRole }) => r.role));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load roles";
      console.error("Error fetching user roles:", msg);
      setError(msg);
      setRoles([]);
    }
  };

  const refreshRoles = async () => {
    if (user) {
      await fetchRoles(user.id);
    }
  };

  useEffect(() => {
    let active = true;

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (active) {
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        if (initialSession?.user) {
          fetchRoles(initialSession.user.id).finally(() => {
            if (active) setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (active) {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          setLoading(true);
          await fetchRoles(newSession.user.id);
          if (active) setLoading(false);
        } else {
          setRoles([]);
          if (active) setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = roles.includes("admin");

  const hasRole = (allowedRoles: AppRole[]) => {
    return roles.some((role) => allowedRoles.includes(role));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        roles,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        hasRole,
        refreshRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
