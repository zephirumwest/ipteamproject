// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext'; // useAuth import

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext에서 login 함수 가져오기
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // 로그인 에러 메시지 (선택 사항)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 애플리케이션에서는 여기서 API를 호출하여 로그인 검증
    // 여기서는 간단히 이메일과 비밀번호가 채워져 있으면 로그인 성공으로 간주
    if (form.email && form.password) {
      // !!! 중요: 실제로는 서버에서 사용자 이름을 받아와야 합니다.
      // 여기서는 이메일 앞부분을 임시로 이름으로 사용하거나,
      // 회원가입 시 저장된 이름을 어떻게든 가져와야 합니다.
      // 가장 간단한 예시는 고정된 사용자 정보 또는 로컬스토리지 사용입니다.
      // 여기서는 이메일의 @ 앞부분을 이름으로 사용한다고 가정합니다.
      const nameFromEmail = form.email.split('@')[0];
      login({ name: nameFromEmail, email: form.email }); // name 필드가 있는 객체 전달
      alert('로그인 성공!');
      navigate('/');
    } else {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
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

        {/* ... (이메일, 비밀번호 input 필드) ... */}
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