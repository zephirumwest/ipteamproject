import React, { useState } from 'react';
import './Quiz.css'; // CSS 파일 import

const questions = [
  // ... (questions 배열은 동일)
  {
    question: '다음 중 치매 예방에 좋은 활동은?',
    options: ['혼자 있기', '규칙적인 운동', '불규칙한 수면', '과음'],
    answer: 1,
  },
  {
    question: '하루 몇 시간 정도 자는 것이 적절할까요?',
    options: ['3시간', '5시간', '7시간 이상', '10시간 이상'],
    answer: 2,
  },
  {
    question: '치매 예방에 좋은 음식은?',
    options: ['인스턴트 음식', '고지방 음식', '채소와 생선', '단 음식'],
    answer: 2,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx) => {
    if (idx === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">치매 예방 퀴즈</h2>

      {!showResult ? (
        <>
          <p className="quiz-question-text">{questions[current].question}</p>
          <div className="quiz-options-grid">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="quiz-option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p className="quiz-result-text">🎉 퀴즈 완료!</p>
          <p className="quiz-score-text">총 점수: {score} / {questions.length}</p>
          <p className="quiz-feedback-text">
            {score === 3 ? '훌륭합니다! 건강한 생활을 유지하세요!' :
             score === 2 ? '좋아요! 조금만 더 주의하면 완벽해요!' :
             '꾸준한 학습이 필요해요. 걱정 말고 천천히 해봐요!'}
          </p>
        </div>
      )}
    </div>
  );
}