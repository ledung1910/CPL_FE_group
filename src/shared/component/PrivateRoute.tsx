import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
  requiredRole?: "Admin" | "User";
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  if (!user) return <Navigate to="/admin-login" replace />;

  return children;
};

export default PrivateRoute;
