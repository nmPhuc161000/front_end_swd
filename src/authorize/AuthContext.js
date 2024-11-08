import React, { createContext, useContext, useState, useEffect } from 'react';

// Context để lưu trạng thái đăng nhập
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Giả sử kiểm tra token trong localStorage để xác định xem người dùng có đăng nhập không
    const token = localStorage.getItem("token");
    setIsLoggedIn(token); // Cập nhật isLoggedIn dựa trên token
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
