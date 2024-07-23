import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const intialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...intialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is unknown");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "dataFailed",
        });
      }
    }
    fetchQuestions();
  }, []);

  function handleStart() {
    dispatch({ type: "start" });
  }

  function handleNewAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function handleFinish() {
    dispatch({ type: "finish" });
  }

  function handleRestart() {
    dispatch({ type: "restart" });
  }

  function handleTick() {
    dispatch({ type: "tick" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        handleStart,
        handleNewAnswer,
        handleNextQuestion,
        handleFinish,
        handleRestart,
        handleTick,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
