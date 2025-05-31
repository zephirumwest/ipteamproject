// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        <label className="block mb-2 font-semibold">이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

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
          가입하기
        </button>
      </form>
    </div>
  );
}
