import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // CSS 파일 import

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  return (
    <div className="signup-page-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-form-title">회원가입</h2>

        <label className="signup-form-label">이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="signup-form-input"
          required
        />

        <label className="signup-form-label">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="signup-form-input"
          required
        />

        <label className="signup-form-label">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="signup-form-input signup-form-input-password"
          required
        />

        <button
          type="submit"
          className="signup-form-submit-button"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}