import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({ children, role}) => {
  const user = localStorage.getItem('user');
  const employee = localStorage.getItem('admin');

  if(!user && role === 'user'){
    return <Navigate to="/login" replace />;
  }else if (!employee) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;;
};

export default ProtectedRoute;