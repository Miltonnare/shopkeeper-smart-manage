
import React from "react";
import { useUserRoles, AppRole } from "@/hooks/useUserRoles";

/**
 * Usage:
 * <RequireRole allowed={["admin", "manager"]}>
 *    <MyAdminComponent />
 * </RequireRole>
 */
export default function RequireRole({
  allowed,
  fallback = null,
  children,
}: {
  allowed: AppRole[]; // Array of allowed roles
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { roles, loading } = useUserRoles();

  if (loading) return null; // or spinner if you wish
  if (roles.some(role => allowed.includes(role))) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
