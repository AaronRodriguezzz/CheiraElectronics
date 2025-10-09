import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/UserContext";

export const useUser = () => {
    const { user } = useAuth();
     
    return user;
}

export const useUserProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        // if admin, block access to login (go to admin area)
        if (user && user.role !== undefined) {
            navigate("/admin", { replace: true });
        } else if (user && user.role === undefined) {
            navigate("/", { replace: true });
        }
    }, [user, loading, navigate]);
}

export const useCustomerPageProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if(!loading){
            if (user && user?.role === undefined) {
                navigate('/');
            }else {
                navigate('/login');
            }
        }
        
    }, [user, loading, navigate]);
}

export const usePageProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if(!loading){
            if (!user) {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);
}


export const useAdminPageProtection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return; // WAIT until auth status is known
        // if not logged in OR user has no role, redirect to admin login
        if (!user || user.role === undefined) {
            navigate("/admin/login", { replace: true });
        }
    }, [user, loading, navigate]);
};