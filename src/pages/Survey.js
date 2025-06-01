import React, { useState } from 'react';
import './Survey.css'; // CSS 파일 import

const questions = [
  // ... (questions 배열은 동일)
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

  const score = answers.reduce((acc, val) => acc + (val ?? 0), 0); // 점수 계산 로직은 그대로

  return (
    <div className="survey-container">
      <h2 className="survey-title">오늘의 건강 설문</h2>

      {!submitted ? (
        <>
          {questions.map((q, idx) => (
            <div key={idx} className="survey-question-block">
              <p className="survey-question-text">{q.q}</p>
              <div className="survey-options-container">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(idx, oIdx)}
                    className={`survey-option-button ${
                      answers[idx] === oIdx ? 'selected' : ''
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="survey-submit-button"
            onClick={handleSubmit}
            disabled={answers.includes(null)}
          >
            제출하기
          </button>
        </>
      ) : (
        <div className="survey-result-container">
          <p className="survey-result-message">✅ 설문이 완료되었습니다.</p>
          <p className="survey-result-score">당신의 건강 점수: {score} / 6</p> {/* 최대 점수 수정 필요시 반영 */}
          <p className="survey-result-feedback">
            {/* 점수에 따른 피드백 로직은 그대로 */}
            {score <= 2 && '매우 양호한 상태입니다!'}
            {score === 3 || score === 4 ? '약간의 주의가 필요합니다.' : ''}
            {score >= 5 && '병원 방문이 권장됩니다.'}
          </p>
        </div>
      )}
    </div>
  );
}