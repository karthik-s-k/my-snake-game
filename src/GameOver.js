import React, { useEffect } from "react";
import "./GameOver.css";

function GameOver({ score }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        window.location.reload();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
