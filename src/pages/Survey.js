// src/pages/Survey.js
import React, { useState } from 'react';

const questions = [
  { q: '오늘 몸 상태는 어떤가요?', options: ['좋음', '보통', '나쁨'] },
  { q: '어제 수면 시간은?', options: ['7시간 이상', '4~6시간', '3시간 이하'] },
  { q: '호흡기 불편함이 있었나요?', options: ['없음', '약간 있음', '심함'] },
];

export default function Survey() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.reduce((acc, val) => acc + (val ?? 0), 0);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">오늘의 건강 설문</h2>

      {!submitted ? (
        <>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-lg mb-2">{q.q}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(idx, oIdx)}
                    className={`p-3 border rounded ${
                      answers[idx] === oIdx ? 'bg-blue-100 font-bold' : 'bg-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={answers.includes(null)}
          >
            제출하기
          </button>
        </>
      ) : (
        <div className="text-lg">
          <p className="mb-3">✅ 설문이 완료되었습니다.</p>
          <p className="font-semibold">당신의 건강 점수: {score} / 6</p>
          <p className="mt-2 text-green-600">
            {score <= 2 && '매우 양호한 상태입니다!'}
            {score === 3 || score === 4 ? '약간의 주의가 필요합니다.' : ''}
            {score >= 5 && '병원 방문이 권장됩니다.'}
          </p>
        </div>
      )}
    </div>
  );
}
