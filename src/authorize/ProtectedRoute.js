import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Đảm bảo đường dẫn đúng

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
    return <Navigate to="/signin" replace />;
  }

  // Nếu đã đăng nhập, hiển thị trang yêu cầu
  return children;
};

export default ProtectedRoute;
