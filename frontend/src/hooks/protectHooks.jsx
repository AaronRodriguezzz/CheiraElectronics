import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/UserContext";
import { useLocation } from "react-router-dom";

// Return the current user
export const useUser = () => {
  const { user } = useAuth();
  return user;
};

// Prevent logged-in users from accessing login/signup pages
export const useUserProtection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.pathname || '/'
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
        // Redirect based on role
            if (user.role === "Admin" || user.role === "Super Admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        }
    }, [user, loading, navigate]);
};

// Protect pages that only logged-in customers can view
export const useCustomerPageProtection = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
        // Not logged in → login
            if (!user) {
                navigate("/login", { replace: true });
            }
            // Admin trying to access customer page → redirect to admin dashboard
            else if (user.role === "Admin" || user.role === "Super Admin") {
                navigate("/admin", { replace: true });
            }
        }
    }, [user, loading, navigate]);
};

// Protect general pages from unauthenticated users
export const usePageProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login", { replace: true });
        }
    }, [user, loading, navigate]);
};

// Protect admin-only pages
export const useAdminPageProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
        // Not logged in → admin login
        if (!user) {
            navigate("/admin/login", { replace: true });
        }
        // Non-admin → redirect home
        else if (user.role !== "Admin" && user.role !== "Super Admin") {
            navigate("/", { replace: true });
        }
        }
    }, [user, loading, navigate]);
};