import React from "react";
import Score from "./Score";
import Instruction from "./Instruction";
import "./../style/ActionContainer.css";

function ActionContainer({
  score,
  foodEatenCount,
  specialFoodEatenCount,
  showInstructions,
  showInstructionHandleMouseEnter,
  showInstructionHandleMouseLeave,
  startGame,
  startAutoPlay,
  manualPlay,
  autoPlay,
}) {
  return (
    <div className="action-container">
      <Score
        score={score}
        foodEatenCount={foodEatenCount}
        specialFoodEatenCount={specialFoodEatenCount}
      />
      <Instruction
        showInstructions={showInstructions}
        showInstructionHandleMouseEnter={showInstructionHandleMouseEnter}
        showInstructionHandleMouseLeave={showInstructionHandleMouseLeave}
      />
      <div className="button-container">
        <button
          className={`start-game-button ${autoPlay ? "disabled" : ""}`}
          onClick={startGame}
          title="Click here to start the game"
          disabled={autoPlay ? "disabled" : ""}
        >
          {manualPlay ? "Pause" : "Start"}
        </button>
        <button
          className={`auto-play-button ${manualPlay ? "disabled" : ""}`}
          onClick={startAutoPlay}
          title="click here to start the game in auto play mode"
          disabled={manualPlay ? "disabled" : ""}
        >
          {autoPlay ? "Pause" : "Auto Play"}
        </button>
      </div>
    </div>
  );
}

export default ActionContainer;
