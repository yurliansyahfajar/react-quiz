function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
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
