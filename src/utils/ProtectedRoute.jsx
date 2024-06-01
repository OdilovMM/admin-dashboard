import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { adminInfo, token } = useSelector((state) => state.auth);

  if (!adminInfo && !token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
