
import TopNav from "@/components/TopNav";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useAllUserRoles } from "@/hooks/useAllUserRoles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import AdminProfitLossReport from "@/components/AdminProfitLossReport";

// Enum for allowed role values
const ROLE_VALUES = ["admin", "manager", "sales", "inventory", "viewer"] as const;
type RoleOption = typeof ROLE_VALUES[number];

export default function UserRoles() {
  const { roles, loading } = useUserRoles();
  const navigate = useNavigate();
  const isAdmin = roles?.includes("admin");

  // Admin viewing all users
  const { data: userRoles, isLoading, refetch } = useAllUserRoles();

  // Restrict add form to valid RoleOption
  const [addForm, setAddForm] = useState<{ user_id: string; role: RoleOption }>({ user_id: "", role: "manager" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [loading, isAdmin, navigate]);

  if (loading || isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(120deg, #2563eb 0%, #3b82f6 35%, #14b8a6 70%, #a78bfa 100%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-accent text-xl font-semibold">Loading Admin Panel...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  // Add role for user (by user_id for now)
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const { user_id, role } = addForm;
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert([
          {
            user_id,
            role, // type RoleOption, matches enum
            active: true,
          }
        ]);
      if (error) throw error;
      toast({ title: "Role Added", description: "Successfully added role." });
      setAddForm({ user_id: "", role: "manager" });
      refetch();
    } catch (err: any) {
      toast({ title: "Error", description: String(err?.message) });
    } finally {
      setAdding(false);
    }
  };

  // Remove role
  const handleRemove = async (id: string) => {
    if (!window.confirm("Are you sure to remove this user role?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      toast({ title: "Role Removed" });
      refetch();
    }
  };

  // Toggle active/inactive
  const handleToggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("user_roles").update({ active: !current }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      toast({ title: `User marked as ${!current ? "Active" : "Inactive"}` });
      refetch();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #2563eb 0%, #3b82f6 35%, #14b8a6 70%, #a78bfa 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated/faint background blobs for modern theme consistency */}
      <div className="absolute top-10 left-[-5rem] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute bottom-[-5rem] right-[-4rem] w-96 h-80 bg-indigo-400/25 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute top-1/2 left-32 -translate-y-1/2 w-56 h-56 bg-emerald-200/15 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-52 h-48 bg-white/20 rounded-full blur-3xl z-0" />

      <TopNav />

      <main className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col items-center text-center flex-1 w-full relative z-10">
        <div className="glass-card light w-full max-w-2xl mb-6 p-6 sm:p-8 shadow-xl rounded-2xl border text-left">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-accent drop-shadow text-center sm:text-left">Admin Roles Management</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 mt-2 text-center sm:text-left">
            Manage user roles, status, and permissions below.
          </p>

          {/* Admin-only: Profit/Loss Report */}
          <div className="w-full mb-8">
            <AdminProfitLossReport />
          </div>

          <form onSubmit={handleAdd} className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-5 items-center bg-white/60 py-4 px-2 sm:px-4 rounded-xl shadow">
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full sm:w-56"
              placeholder="User ID"
              value={addForm.user_id}
              onChange={e => setAddForm(f => ({ ...f, user_id: e.target.value }))}
              required
            />
            <select
              className="border border-slate-300 rounded px-4 py-2 w-full sm:w-auto"
              value={addForm.role}
              onChange={e => setAddForm(f => ({
                ...f,
                role: e.target.value as RoleOption,
              }))}
            >
              {ROLE_VALUES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <Button type="submit" disabled={adding} className="mt-2 sm:mt-0 w-full sm:w-auto">
              {adding ? "Adding..." : "Add User"}
            </Button>
          </form>
        </div>

        <div className="w-full bg-white/70 glass-card light rounded-xl shadow overflow-x-auto mb-4 py-4 px-1 sm:px-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRoles?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No user roles found.</TableCell>
                </TableRow>
              ) : (
                userRoles.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="break-all max-w-[100px] sm:max-w-none">{u.user_id}</TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${u.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
                        {u.active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Switch checked={u.active} onCheckedChange={() => handleToggleActive(u.id, u.active)} />
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleRemove(u.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8 text-sm text-muted-foreground py-2 glass-card light w-full max-w-2xl">
          <b>Note:</b> For demo, you must enter a User ID. Email/user search & mapping can be added if allowed.
        </div>
      </main>
    </div>
  );
}
