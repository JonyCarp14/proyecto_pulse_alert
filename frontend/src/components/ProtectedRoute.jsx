
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const homePath = user.role === 'admin' ? '/users' : '/dashboard';
        return <Navigate to={homePath} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;

