import React from "react";
import "./../style/Instruction.css";

function Instruction(props) {
  return (
    <div className="instruction-container">
      <button
        className="instruction-button"
        onMouseEnter={props.showInstructionHandleMouseEnter}
        onMouseLeave={props.showInstructionHandleMouseLeave}
      >
        Show instruction
      </button>
      <ul
        className={`instructions ${props.showInstructions ? "show" : "hide"}`}
      >
        <li>
          The snake's goal is to eat the food (red block) that appears on the
          canvas.
        </li>
        <li>
          Use the arrow keys (left, right, up, and down) to control the snake's
          movement.
        </li>
        <li>Each time the snake eats food, it will grow in length.</li>
        <li>
          The snake must avoid hitting the walls of the canvas or its own body.
        </li>
        <li>
          If the snake hits the wall or its own body, the game will end and the
          player will have the option to play again.
        </li>
        <li>
          The game also includes a special food (yellow block) that appears with
          a 15% chance.
        </li>
        <li>
          When the snake eats special food, score will be current score plus 5
        </li>
      </ul>
    </div>
  );
}

export default Instruction;
