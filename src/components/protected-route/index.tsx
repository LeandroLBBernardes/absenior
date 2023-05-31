import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/user-auth";

export const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>
};

export default ProtectedRoute