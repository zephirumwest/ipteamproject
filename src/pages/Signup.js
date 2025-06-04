// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' }); // confirmPassword 추가
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // 이전 에러 초기화

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // localStorage에서 기존 사용자 목록 가져오기
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 이메일 중복 확인
    if (users.find(user => user.email === form.email)) {
      setError('이미 사용 중인 이메일입니다.');
      return;
    }

    // 새 사용자 정보 저장 (실제로는 비밀번호 해싱 필요)
    users.push({ name: form.name, email: form.email, password: form.password });
    localStorage.setItem('users', JSON.stringify(users));

    // 회원가입 성공 시 바로 로그인 처리
    login({ name: form.name, email: form.email });
    alert('회원가입이 완료되었습니다! 자동으로 로그인됩니다.');
    navigate('/');
  };

  return (
    <div className="signup-page-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-header-link-container">
          <Link to="/" className="form-to-home-link">← 홈으로 돌아가기</Link>
        </div>

        <h2 className="signup-form-title">회원가입</h2>
        {error && <p className="form-error-message" style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}

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
          className="signup-form-input"
          required
        />
        {/* 비밀번호 확인 필드 추가 */}
        <label className="signup-form-label">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="signup-form-input signup-form-input-password" // 스타일 클래스 재활용 또는 새 클래스
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