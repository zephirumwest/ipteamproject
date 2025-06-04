// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // 이전 에러 초기화

    if (!form.email || !form.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // localStorage에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 입력된 이메일과 비밀번호로 사용자 찾기
    const foundUser = users.find(user => user.email === form.email && user.password === form.password);

    if (foundUser) {
      login({ name: foundUser.name, email: foundUser.email }); // 찾은 사용자의 이름으로 로그인
      alert('로그인 성공!');
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-header-link-container">
          <Link to="/" className="form-to-home-link">← 홈으로 돌아가기</Link>
        </div>

        <h2 className="login-form-title">로그인</h2>
        {error && <p className="form-error-message" style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}

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