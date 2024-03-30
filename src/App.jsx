import { useState, useRef } from "react";
import "./App.css";

const pomoSuggetions = [
  { focusTime: 25, breakTime: 5 },
  { focusTime: 50, breakTime: 10 },
  { focusTime: 1, breakTime: 30 },
];

function App() {
  const [timer, setTimer] = useState({
    Focus: { minutes: 25, seconds: 0 },
    Break: { minutes: 5, seconds: 0 },
  });
  const timerRef = useRef(timer);
  //2 Timer sates -> Focus, Break
  const [timerState, setTimerState] = useState("Focus");
  let min = timer[timerState].minutes;
  let sec = timer[timerState].seconds;
  //states -> Start, Countdown, Pause
  const [state, setState] = useState("Start");
  const timerCountdown = useRef(null);
  const suggetionButtons = pomoSuggetions.map((pomodoro, index) => {
    return (
      <button
        key={index}
        className="sugButtons"
        onClick={() => {
          let timerObj = {
            Focus: { minutes: pomodoro.focusTime, seconds: 0 },
            Break: { minutes: pomodoro.breakTime, seconds: 0 },
          };
          setTimer(timerObj);
          timerRef.current = timerObj;
          stopTimer();
        }}
      >
        {pomodoro.focusTime}/{pomodoro.breakTime}
      </button>
    );
  });
  let stateChangingBtn = () => {
    if (state === "Start") return "Start";
    else if (state === "Countdown") return "Pause";
    else if (state === "Pause") return "Restart";
  };
  function handleTimer() {
    if (state == "Start" || state == "Pause") {
      setState("Countdown");
      timerCountdown.current = setInterval(() => {
        setTimer((prevTime) => {
          let min = prevTime[timerState].minutes;
          let sec = prevTime[timerState].seconds;
          if (min === 0 && sec === 0) {
            clearInterval(timerCountdown.current);
            setState("Start");
            return timerRef.current;
          } else if (sec === 0) {
            return {
              ...prevTime,
              [timerState]: {
                minutes: min - 1,
                seconds: 59,
              },
            };
          } else {
            return {
              ...prevTime,
              [timerState]: {
                ...prevTime[timerState],
                seconds: prevTime[timerState].seconds - 1,
              },
            };
          }
        });
      }, 1000);
    } else if (state == "Countdown") {
      setState("Pause");
      clearInterval(timerCountdown.current);
    }
  }
  function stopTimer() {
    if (timerCountdown.current !== null) {
      clearInterval(timerCountdown.current);
      setState("Start");
      setTimer(timerRef.current);
    }
  }
  return (
    <>
      <div className="container">
        <div className="buttonContainer">{suggetionButtons}</div>
        <div className="timerContainer">
          <h1>
            {min < 10 ? "0" + min.toString() : min}:
            {sec < 10 ? "0" + sec.toString() : sec}
          </h1>
          <button type="button" id="resetButton" onClick={handleTimer}>
            {stateChangingBtn()}
          </button>
        </div>
        <div className="buttonContainer">
          <button
            type="button"
            onClick={() => {
              setTimerState("Focus");
              stopTimer();
            }}
          >
            Focus
          </button>
          <button
            type="button"
            onClick={() => {
              setTimerState("Break");
              stopTimer();
            }}
          >
            Break
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
