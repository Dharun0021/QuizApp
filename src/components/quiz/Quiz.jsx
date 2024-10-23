import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data'; // Ensure the file path is correct

export const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const checkAnswer = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const handleNext = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(index + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        option_array.forEach(option => {
          option.current.classList.remove("correct", "wrong");
        });
      }
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
    setLock(false);
    option_array.forEach(option => {
      option.current.classList.remove("correct", "wrong");
    });
  };

  return ( 
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>Your score is {score} out of {data.length}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.options1}</li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>{question.options2}</li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>{question.options3}</li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>{question.options4}</li>
          </ul>
          <button onClick={handleNext}>Next</button>
          <div className="index">{index + 1} out of {data.length}</div>
        </>
      )}
    </div>
  );
};
