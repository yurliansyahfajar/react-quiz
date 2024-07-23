import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { numberQuestions, handleStart } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{numberQuestions} Questions question to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's Start
      </button>
    </div>
  );
}
