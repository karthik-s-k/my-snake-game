import React from "react";
import "./../style/StartGame.css";

function StartGame() {
  return (
    <div className="start-screen-overlay">
      <div className="start-instructions">
        Use arrow key to start the game / Click on Auto Play button
      </div>
      <div className="arrow-keys">
        <div className="arrow-key left"></div>
        <div className="arrow-key up"></div>
        <div className="arrow-key down"></div>
        <div className="arrow-key right"></div>
      </div>
    </div>
  );
}

export default StartGame;
