// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <label className="block mb-2 font-semibold">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-semibold">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg py-3 rounded hover:bg-blue-700"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
