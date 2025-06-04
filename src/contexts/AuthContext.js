// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react'; // useEffect 추가

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 불러오기
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("localStorage에서 사용자 정보 로드 실패:", error);
      localStorage.removeItem('currentUser'); // 손상된 데이터 제거
    }
  }, []);

  const login = (userData) => {
    // userData는 { name: '사용자이름', email: '이메일' } 형태여야 합니다.
    setCurrentUser({ name: userData.name, email: userData.email });
    localStorage.setItem('currentUser', JSON.stringify({ name: userData.name, email: userData.email }));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};