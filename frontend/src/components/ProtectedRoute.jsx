import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role ?? user.rol;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        const homePath = userRole === 'admin' ? '/users' : '/dashboard';
        return <Navigate to={homePath} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;



