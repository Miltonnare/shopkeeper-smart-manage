
import TopNav from "@/components/TopNav";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * Basic Admin "User Roles" panel — you can expand this with a table, forms, etc!
 */
export default function UserRoles() {
  const { roles, loading } = useUserRoles();
  const navigate = useNavigate();
  const isAdmin = roles?.includes("admin");

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Not authorized, redirect or show message
      navigate("/dashboard");
    }
  }, [loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent text-xl font-semibold">Loading Admin Panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    // Brief flash before redirect
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center flex-1 w-full">
        <h1 className="text-4xl font-bold mb-4 text-accent drop-shadow">
          Admin Roles Management
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Here you can manage user roles. (Feature coming soon!)
        </p>
        {/* Add your roles management UI here */}
        <div className="p-6 bg-white/80 border shadow-md rounded-xl text-center">
          <span className="block text-gray-600 mb-2">
            This is a placeholder page for Admin Roles management.
          </span>
          <span className="text-xs text-muted-foreground">
            You are seeing this because you have the <span className="font-bold">admin</span> role.
          </span>
        </div>
      </main>
    </div>
  );
}
