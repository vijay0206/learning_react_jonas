function FinishedScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentge = (points / maxPossiblePoints) * 100;

  let emoji;

  if (percentge === 100) emoji = "🥇";
  if (percentge >= 80 && percentge < 100) emoji = "🥳";
  if (percentge >= 50 && percentge < 80) emoji = "😄";
  if (percentge >= 0 && percentge < 50) emoji = "🤔";
  if (percentge === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints}({Math.ceil(percentge)}%)
      </p>
      <p className="highscore">(High Score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
