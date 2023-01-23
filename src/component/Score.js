import React from "react";
import "./../style/Score.css";

function Score({ score }) {
  return (
    <div className="score-container">
      <p>Score: {score}</p>
    </div>
  );
}

export default Score;
