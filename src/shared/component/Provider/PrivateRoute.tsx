import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
  requiredRole?: "Admin" | "User";
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  if (!user) {
    return <Navigate to={requiredRole === "Admin" ? "/admin-login" : "/"} replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "Admin" ? "/admin" : "/"} replace />;
  }

  return children;
};

export default PrivateRoute;
