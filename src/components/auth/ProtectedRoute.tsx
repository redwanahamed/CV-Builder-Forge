
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { type UserRole } from "@/contexts/AuthContext";
import { AdminPinDialog } from "@/components/auth/AdminPinDialog";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isAuthenticated, userRole, isAdminLocked } = useAuth();
  const location = useLocation();
  const [showPinDialog, setShowPinDialog] = useState(false);

  // Check if admin needs to enter PIN
  useEffect(() => {
    if (isAuthenticated && role === "admin" && userRole === "admin" && isAdminLocked) {
      setShowPinDialog(true);
    }
  }, [isAuthenticated, role, userRole, isAdminLocked]);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "admin" && userRole !== "admin") {
    // Redirect to home if trying to access admin page without admin role
    return <Navigate to="/" replace />;
  }

  if (role === "admin" && isAdminLocked) {
    // Show PIN dialog if admin is locked
    return (
      <>
        {children}
        <AdminPinDialog open={showPinDialog} onOpenChange={setShowPinDialog} />
      </>
    );
  }

  return <>{children}</>;
}
