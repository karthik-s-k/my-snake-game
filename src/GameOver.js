import React from "react";
import "./GameOver.css";

function GameOver({ score }) {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p>Your Score : {score}</p>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
