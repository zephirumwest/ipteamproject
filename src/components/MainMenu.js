// src/components/MainMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: '날씨 정보', icon: '☀️', path: '/weather' },
  { label: '주변 위치 찾기', icon: '📍', path: '/locations' },
  { label: '건강 설문', icon: '📋', path: '/survey' },
  { label: '치매 예방 퀴즈', icon: '🧠', path: '/quiz' },
];

export default function MainMenu() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 max-w-3xl mx-auto">
      {menuItems.map((item, idx) => (
        <Link to={item.path} key={idx}>
          <button
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:bg-blue-100 transition text-xl font-semibold border border-gray-300 w-full"
          >
            <div className="text-6xl mb-4">{item.icon}</div>
            {item.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
