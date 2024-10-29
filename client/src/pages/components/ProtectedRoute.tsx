import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("user_name");
    const location = useLocation();

    if (!userName) {
        // User is not logged in, only allow access to "/"
        return location.pathname === "/" ? <>{children}</> : <Navigate to="/" replace />;
    }

    if (userRole === "start_up") {
        // Redirect any "/" access attempt to "/adminpanel" if logged in
        if (location.pathname === "/") return <Navigate to="/adminpanel" replace />;
        // Only allow access to "/adminpanel" for "start_up" role
        return location.pathname === "/adminpanel" ? <>{children}</> : <Navigate to="/adminpanel" replace />;
    }

    if (userRole === "investor") {
        // Redirect any "/" access attempt to "/home" if logged in
        if (location.pathname === "/") return <Navigate to="/home" replace />;
        // Deny access to "/adminpanel" for "investor" role
        return location.pathname !== "/adminpanel" ? <>{children}</> : <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
