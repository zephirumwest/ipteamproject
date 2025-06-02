import React, { useState } from 'react';
import './Quiz.css'; // CSS 파일 import
import { useNavigate } from 'react-router-dom';

const questions = [
  // ... (questions 배열은 동일)
  {
    question: '1. 다음 중 규칙에 맞지 않는 숫자는? {4, 6, 11, 12}',
    options: ['4', '6', '11', '12'],
    answer: 2,
  },
  {
    question: '2. 다음 단어 중 어울리지 않는 단어는?',
    options: ['식탁', '의자', '컵', '바나나'],
    answer: 3,
  },
  {
    question: '3. 다음 중 순서대로 정렬한 알파벳은은?',
    options: ['C, D, E, F', 'B, A, D, C', 'G, F, E, D', 'Z, Y, W, X'],
    answer: 0,
  },
  {
    question: '4. 다음 중 ‘나무 → 숲’ 관계와 같은 것은?',
    options: ['물고기 → 비늘', '꽃 → 정원', '새 → 날개', '하늘 → 구름'],
    answer: 1,
  },
  {
    question: '5. 15에서 3을 ‘3번’ 빼면 얼마인가요?',
    options: ['12', '6', '9', '3'],
    answer: 1,
  },
  {
    question: '6. 다음 숫자 중 ‘4’의 배수가 아닌 것은?',
    options: ['8', '32', '16', '27'],
    answer: 3,
  },
  {
    question: '7. 어느 날 A씨는 1300원 짜리 사과 한 개를 2000원에 샀습니다. A씨가 거스름돈으로 받은 돈은 얼마인가요?',
    options: ['200원', '300원', '700원', '900원'],
    answer: 2,
  },
  {
    question: '8. 어느 날 B씨는 6시 30분에 일어나서 40분 후에 아침을 먹었습니다. B씨가 아침을 먹은 시간은 몇 시인가요?',
    options: ['6시 70분', '7시 40분', '7시 30분', '7시 10분'],
    answer: 3,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill( null ));
  const navigate = useNavigate();
  const goBack = () => navigate(-1); // 돌아가기

  const handleAnswer = (idx) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  const handleSubmit = () => {
    const score = answers.reduce((acc, ans, i) => {
      return acc + (ans === questions[i].answer ? 1 : 0);
    }, 0);
    setScore(score);
    setShowResult(true);
  }

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">치매 예방 퀴즈</h2>

      {!showResult ? (
        <>
          <div key = {current} className="quiz-question-block">
            <p className="quiz-question-text">{questions[current].question}</p>
            <div className="quiz-options-grid">
              {questions[current].options.map((option, idx) => (
                <button
                  key={`${current}-${idx}`}
                  onClick={() => handleAnswer(idx)}
                  className={`quiz-option-button ${
                    answers[current] === idx ? 'selected' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="quiz-navigation">
            {current > 0 && (
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className='quiz-navigation-button'
              >
                이전
              </button>
            )}

            { current < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[current] === null}
                className="quiz-navigation-button"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answers.includes(null)}
                className="quiz-submit-button"
              >
                제출하기
              </button>
            )}
          </div>

          <div className="quiz-progress-container">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className='quiz-progress-text'>
              {current + 1} / {questions.length}
            </p>
          </div>

        </>
      ) : (
        <>
          <div>
            <p className="quiz-result-text">🎉 퀴즈 완료!</p>
            <p className="quiz-score-text">총 점수: {score} / {questions.length}</p>
            <p className="quiz-feedback-text">
              {score >= 6 ? '훌륭합니다! 치매 예방에 매우 잘 대비하고 있습니다.' :
              score >= 4 && score <= 5 ? '주의가 필요합니다. 생활습관을 점검해 보세요.' :
              score <= 3 && (
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
          <button onClick={goBack} className="quiz-submit-button fade-in">
            돌아가기
          </button>
        </>
      )}
    </div>
  );
}