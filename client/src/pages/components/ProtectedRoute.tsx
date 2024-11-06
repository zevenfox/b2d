import React, { ReactNode } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("user_name");
    const user_id = localStorage.getItem("id");
    const location = useLocation();

    if (!userName) {
        // User is not logged in, only allow access to "/"
        return location.pathname === "/" ? <>{children}</> : <Navigate to="/" replace />;
    }

    if (location.pathname === "/") {
        if (userRole === "start_up") {
            return <Navigate to={`/adminpanel/${user_id}`} replace />;
        }
        if (userRole === "investor") {
            return <Navigate to="/home" replace />;
        }
    }

    if (userRole === "start_up") {
        // Redirect any "/" access attempt to "/adminpanel/:user_id" if logged in
        if (location.pathname === "/") {
            return <Navigate to={`/adminpanel/${user_id}`} replace />;
        }

        // Only allow access to "/adminpanel/:user_id" for "start_up" role
        if (location.pathname !== `/adminpanel/${user_id}`) {
            return <Navigate to={`/adminpanel/${user_id}`} replace />;
        }

        // If the user is on the correct admin panel page, render the children
        return <>{children}</>;
    }

    if (userRole === "investor") {
        // Redirect any "/" access attempt to "/home" if logged in
        if (location.pathname === "/") return <Navigate to="/home" replace/>;
        // Deny access to "/adminpanel" for "investor" role
        if (location.pathname.startsWith(`/adminpanel`)) {
            return <Navigate to="/home" replace/>;
        }
    }
    return <>{children}</>;
};

export default ProtectedRoute;
