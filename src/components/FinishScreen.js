import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, handleRestart } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </strong>
      </p>
      <p className="highscore">(High score : {highscore} Points)</p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
