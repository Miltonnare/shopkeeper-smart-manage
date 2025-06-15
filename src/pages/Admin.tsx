
import TopNav from "@/components/TopNav";
import RequireRole from "@/components/auth/RequireRole";
import AdminProfitLossReport from "@/components/AdminProfitLossReport";

export default function Admin() {
  return (
    <RequireRole allowed={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
        <TopNav />
        <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center w-full">
          <h1 className="text-4xl font-bold mb-6 text-accent drop-shadow">Admin Panel</h1>
          <p className="mb-8 text-lg text-muted-foreground text-center">
            Powerful admin-only controls below.
          </p>
          {/* Admin-specific panels */}
          <AdminProfitLossReport />
        </main>
      </div>
    </RequireRole>
  );
}
