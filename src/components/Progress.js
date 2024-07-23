import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1}/{numQuestions}
      </p>
      <p>
        <strong>
          {" "}
          {points}/{maxPossiblePoints} Points
        </strong>
      </p>
    </header>
  );
}

export default Progress;
