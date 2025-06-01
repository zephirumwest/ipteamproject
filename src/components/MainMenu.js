import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css'; // CSS 파일 import

const menuItems = [
  { label: '날씨 정보', path: '/weather', icon: '☀️' },
  { label: '주변 위치 찾기', path: '/locations', icon: '🏥' },
  { label: '건강 설문', path: '/survey', icon: '📋' },
  { label: '치매 예방 퀴즈', path: '/quiz', icon: '🧠' },
];

export default function MainMenu() {
  return (
    <div className="main-menu-container">
      {/* 상단 제목 - Home.js의 Header와 중복될 수 있으므로 Home.js에서만 사용하거나 여기서 제거 고려 */}
      {/* <div className="main-menu-title-bar">
        실버 건강 지원 플랫폼
      </div> */}

      <div className="main-menu-grid">
        {menuItems.map((item, idx) => (
          <Link to={item.path} key={idx} className="main-menu-item-link">
            <div className="main-menu-item">
              <div className="main-menu-item-icon">{item.icon}</div>
              <div className="main-menu-item-label">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}