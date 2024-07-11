import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const intialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { questions, status } = state;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data
        });
      } catch (error) {
        dispatch({
          type: "dataFailed"
        });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
