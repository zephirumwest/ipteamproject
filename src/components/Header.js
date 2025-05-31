import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-700 text-white py-6 px-4 text-center">
      <h1 className="text-3xl font-bold">실버 건강 지원 플랫폼</h1>
      <div className="mt-2 text-lg">
        <Link to="/login" className="underline mr-4 hover:text-yellow-200">로그인</Link>
        <Link to="/signup" className="underline hover:text-yellow-200">회원가입</Link>
      </div>
    </header>
  );
}
