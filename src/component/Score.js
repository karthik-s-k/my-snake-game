import React from "react";
import "./../style/Score.css";

function Score({ score, foodEatenCount, specialFoodEatenCount }) {
  return (
    <div className="score-container">
      <p>Score: {score}</p>
      <div>Fruits: {foodEatenCount}</div>
      <div>Special food: {specialFoodEatenCount}</div>
    </div>
  );
}

export default Score;
