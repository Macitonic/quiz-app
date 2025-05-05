import { useState } from "react";
import Results from "./results";

function Quiz() {
  const questionBank = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which Language is used for Web apps?",
      options: ["PHP", "Python", "Javascript", "All"],
      answer: "All",
    },
    {
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax eXtension",
        "Just a Simple eXample",
        "None of the above",
      ],
      answer: "JavaScript XML",
    },
  ];

  const intialAnswers = [null, null, null];

  const [userAnswers, setuserAnswers] = useState(intialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selctedAnswer = userAnswers[currentQuestion];

  function handleSelectOption(option) {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;

    setuserAnswers(newUserAnswers);
  }
  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goToPrev() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function restartQuiz() {
    setuserAnswers(intialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  if (isQuizFinished) {
    return (
      <Results
        questionBank={questionBank}
        userAnswers={userAnswers}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question"> {questionBank[currentQuestion].question} </p>
      {questionBank[currentQuestion].options.map((option) => (
        <button
          className={"option" + (selctedAnswer === option ? "selected" : " ")}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}
      <div className="nav-buttons">
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          {" "}
          Previous{" "}
        </button>
        <button onClick={goToNext} disabled={!selctedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}
export default Quiz;
