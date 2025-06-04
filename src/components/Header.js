// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../contexts/AuthContext'; // useAuth import

export default function Header() {
  const { currentUser, logout } = useAuth(); // AuthContext에서 currentUser와 logout 함수 가져오기

  const handleLogout = () => {
    logout();
    // 필요시 홈페이지 등으로 리디렉션
    // navigate('/'); // useNavigate 사용 시
  };

  return (
    <header className="header-container">
      <h1 className="header-title">실버 건강 지원 플랫폼</h1>
      <div className="header-nav">
        {currentUser ? (
          <>
            <span className="header-welcome-message">{currentUser.name}님 안녕하세요!</span>
            <button onClick={handleLogout} className="header-logout-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-nav-link">로그인</Link>
            <Link to="/signup" className="header-nav-link" style={{ marginRight: 0 }}>회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}