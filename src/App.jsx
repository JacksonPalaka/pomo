import { useState } from "react";
import "./App.css";

const pomoSuggetions = [
  { focusTime: 25, breakTime: 5 },
  { focusTime: 50, breakTime: 10 },
  { focusTime: 90, breakTime: 30 },
];

function App() {
  const [timer, setTimer] = useState({
    Focus: { minutes: 25, seconds: 0 },
    Break: { minutes: 5, seconds: 0 },
  });
  //2 Timer sates -> Focus, Break
  const [timerState, setTimerState] = useState("Focus");
  let min = timer[timerState].minutes;
  let sec = timer[timerState].seconds;
  //3 states -> Start, Countdown, Pause
  const [state, setState] = useState("");
  const suggetionButtons = pomoSuggetions.map((pomodoro, index) => {
    return (
      <button
        key={index}
        className="sugButtons"
        onClick={() =>
          setTimer({
            Focus: { minutes: pomodoro.focusTime, seconds: 0 },
            Break: { minutes: pomodoro.breakTime, seconds: 0 },
          })
        }
      >
        {pomodoro.focusTime}/{pomodoro.breakTime}
      </button>
    );
  });
  return (
    <>
      <div className="container">
        <div className="buttonContainer">{suggetionButtons}</div>
        <div className="timerContainer">
          <h1>
            {min < 10 ? "0" + min.toString() : min}:
            {sec < 10 ? "0" + sec.toString() : sec}
          </h1>
          <button type="reset" id="resetButton">
            Start/Pause
          </button>
        </div>
        <div className="buttonContainer">
          <button type="button" onClick={() => setTimerState("Focus")}>
            Focus
          </button>
          <button type="button" onClick={() => setTimerState("Break")}>
            Break
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
