import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TrackSales from "./pages/TrackSales";
import SalesReports from "./pages/SalesReports";
import AddProduct from "./pages/AddProduct";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import UserRoles from "./pages/UserRoles";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        <span className="animate-spin rounded-full border-4 border-primary/20 border-t-primary mr-3 h-8 w-8" />
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            {/* Dashboard is public but displays prompt if not logged in */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Admin-only User Roles Page (protected inside component) */}
            <Route
              path="/user-roles"
              element={
                <ProtectedRoute>
                  <UserRoles />
                </ProtectedRoute>
              }
            />
            {/* Protected routes */}
            <Route
              path="/track-sales"
              element={
                <ProtectedRoute>
                  <TrackSales />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales-reports"
              element={
                <ProtectedRoute>
                  <SalesReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
