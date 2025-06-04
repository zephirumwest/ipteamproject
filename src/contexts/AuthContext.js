// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // { name: '사용자이름' } 또는 null

  const login = (userData) => {
    // 실제 애플리케이션에서는 API 호출 후 사용자 정보를 받겠지만,
    // 여기서는 userData (예: { name: '홍길동', email: '...' })를 직접 사용합니다.
    setCurrentUser({ name: userData.name });
    // 필요하다면 localStorage 등에 로그인 상태를 저장할 수 있습니다.
    // localStorage.setItem('user', JSON.stringify({ name: userData.name }));
  };

  const logout = () => {
    setCurrentUser(null);
    // localStorage.removeItem('user');
  };

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 불러오기 (선택 사항)
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  // }, []);


  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};