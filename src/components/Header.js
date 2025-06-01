import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // CSS 파일 import

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="header-title">실버 건강 지원 플랫폼</h1>
      <div className="header-nav">
        <Link to="/login" className="header-nav-link">로그인</Link>
        <Link to="/signup" className="header-nav-link" style={{ marginRight: 0 }}>회원가입</Link> {/* 마지막 링크는 mr-4 제거 */}
      </div>
    </header>
  );
}