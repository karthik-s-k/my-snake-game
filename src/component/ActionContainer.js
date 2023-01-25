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
  startAIGame,
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
        <button className="start-game-button" onClick={startGame}>
          Start
        </button>
        <button className="ai-mode-button" onClick={startAIGame}>
          AI Mode
        </button>
      </div>
    </div>
  );
}

export default ActionContainer;
