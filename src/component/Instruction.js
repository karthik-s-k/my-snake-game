import React from "react";
import "./../style/Instruction.css";
import infoIcon from "./../icons/info-64.png";

function Instruction(props) {
  return (
    <div className="instruction-container">
      <img
        src={infoIcon}
        className="instruction-icon"
        onMouseEnter={props.showInstructionHandleMouseEnter}
        onMouseLeave={props.showInstructionHandleMouseLeave}
      />
      <ul
        className={`instructions ${props.showInstructions ? "show" : "hide"}`}
      >
        <li>The snake's goal is to eat the food that appears on the canvas.</li>
        <li>
          Use the arrow keys (left, right, up and down) to control the snake's
          movement.
        </li>
        <li>Each time the snake eats food, it will grow in length.</li>
        <li>
          The game also includes a special food (5 score points) that appears
          with a 25% chance.
        </li>
        <li>
          If the snake hits the wall or its own body, the game will end and the
          player will have the option to play again.
        </li>
      </ul>
    </div>
  );
}

export default Instruction;
