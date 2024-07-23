import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { secondsRemaining, handleTick } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(handleTick, 1000);
      return () => clearInterval(id);
    },
    [handleTick]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
