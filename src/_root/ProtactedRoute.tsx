import { ReactNode } from "react";
import { useUserAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser } = useUserAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
