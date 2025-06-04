// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import { useAuth } from '../contexts/AuthContext'; // useAuth import

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext에서 login 함수 가져오기
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      // 회원가입 성공 시 바로 로그인 처리
      login({ name: form.name, email: form.email }); // 입력받은 이름 사용
      alert('회원가입이 완료되었습니다! 자동으로 로그인됩니다.');
      navigate('/'); // 메인 페이지로 이동
    } else {
      setError('모든 필드를 입력해주세요.');
    }
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

        {/* ... (이메일, 비밀번호 input 필드) ... */}
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