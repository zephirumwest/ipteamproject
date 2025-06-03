// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link import 추가
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('로그인 성공!');
    navigate('/');
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-form">
        {/* 홈으로 가기 링크 추가 */}
        <div className="form-header-link-container">
          <Link to="/" className="form-to-home-link">← 홈으로 돌아가기</Link>
        </div>

        <h2 className="login-form-title">로그인</h2>

        <label className="login-form-label">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="login-form-input"
          required
        />

        <label className="login-form-label">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="login-form-input login-form-input-password"
          required
        />

        <button
          type="submit"
          className="login-form-submit-button"
        >
          로그인
        </button>
      </form>
    </div>
  );
}