import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const userInfo = localStorage.getItem('adminInfo');

    // Check if token exists
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoute;
