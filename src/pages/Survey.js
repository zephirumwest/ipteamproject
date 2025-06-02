import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css'; // CSS 파일 import

const questions = [
  // ... (questions 배열은 동일)
  { q: '1. 오늘 몸 상태는 어떤가요?', options: ['좋음', '보통', '나쁨'] },
  { q: '2. 어제 수면 시간은?', options: ['7시간 이상', '4~6시간', '3시간 이하'] },
  { q: '3. 호흡기 불편함이 있었나요?', options: ['없음', '약간 있음', '심함'] },
  { q: '4. 신체 통증(예: 관절 통증, 허리 통증 등)으로 인해 일상생활에 불편을 느낀 적이 있나요?', options: ['그렇지 않다', '보통이다', '그렇다'] },
  { q: '5. 머리가 어지럽거나 걸을 때 불안정한 느낌이 있었나요?', options: ['없음', '약간 있음', '심함'] },
  { q: '6. 최근 우울하거나 무기력한 기분을 자주 느끼고 있나요?', options: ['그렇지 않다', '보통이다', '그렇다'] },
  { q: '7. 최근 기억력에 문제가 있다고 느끼나요?', options: ['그렇지 않다', '보통이다', '그렇다'] },
  { q: '8. 최근에 식욕이 감소했거나 체중이 급격히 변했나요?', options: ['그렇지 않다', '보통이다', '그렇다'] }
];

export default function Survey() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const goBack = () => navigate(-1); // 돌아가기

  const handleSelect = (qIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = optionIdx;
    setAnswers(newAnswers);

    if (qIdx < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => Math.max(prev, qIdx + 1));
      }, 300);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.reduce((acc, val) => acc + (val ?? 0), 0); // 점수 계산 로직은 그대로

  return (
    <div className="survey-container">
      <h2 className="survey-title">오늘의 건강 설문</h2>

      {!submitted && (
        <>
          {questions.slice(0, currentQuestion + 1).map((q, idx) => (
            <div
              key={idx}
              className={`survey-question-block fade-in`}
            >
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

          {currentQuestion === questions.length - 1 && 
            answers.every(ans => ans !== null) &&
            !submitted && (
              <button
                className="survey-submit-button fade-in"
                onClick={handleSubmit}
              >
                제출하기
              </button>
          )}
        </>
      )}

      {submitted && (
        <>
          <div className="survey-result-container">
            <p className="survey-result-message">✅ 설문이 완료되었습니다.</p>
            <p className="survey-result-score">당신의 건강 위험도: {score} / 16</p> {/* 최대 점수 수정 필요시 반영 */}
            <p className="survey-result-feedback">
              {/* 점수에 따른 피드백 로직은 그대로 */}
              {score <= 6 && '매우 양호한 상태입니다!'}
              {score <= 11 && score >= 7 && '약간의 주의가 필요합니다.'}
              {score >= 12 && (
                <>
                  <p>병원 방문이 권장됩니다.</p>
                  <p>건강을 위해 꼭 검진을 받으세요.</p>
                  <br />
                  <button
                    className="survey-hospital-button"
                    onClick={() => navigate('/locations')}
                  >
                    주변 위치 확인하러 가기
                  </button>
                </>
              )}
            </p>
          </div>
          <button onClick={goBack} className="survey-submit-button fade-in">
            돌아가기
          </button>
        </>
      )}
    </div>
  );
}