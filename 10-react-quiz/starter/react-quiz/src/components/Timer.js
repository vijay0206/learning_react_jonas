import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const timerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timerId);
    },
    [dispatch]
  );

  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
