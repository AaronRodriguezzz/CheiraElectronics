import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

export const useUser = () => {
    const { user } = useAuth();
    
    return user;
}

export const useUserProtection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
        if (user && user?.role !== undefined) {
            navigate('/admin');
        }
    }, [user, navigate]);
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
    const { user } = useAuth();

    useEffect(() => {   
        if(user && user.role !== undefined) return navigate('/')
        if(!user) return navigate('/admin/login')

    }, [user, navigate]);
}