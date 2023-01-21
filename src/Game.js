import React, { useState, useRef, useEffect } from "react";
import GameOver from "./GameOver";
import "./Game.css";

function Game() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(20, 0, 0, 20, 0, 0);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.fillStyle = "green";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "red";
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food]);

  useEffect(() => {
    const move = setInterval(() => {
      const newSnakeHead = [
        snake[0][0] + direction[0],
        snake[0][1] + direction[1],
      ];
      const newSnake = [newSnakeHead, ...snake.slice(0, -1)];
      setSnake(newSnake);
    }, speed);
    setIntervalId(move);
    return () => clearInterval(move);
  }, [direction, snake, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) setDirection([-1, 0]);
      if (e.keyCode === 38) setDirection([0, -1]);
      if (e.keyCode === 39) setDirection([1, 0]);
      if (e.keyCode === 40) setDirection([0, 1]);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
      setFood([
        Math.floor((Math.random() * canvasRef.current.width) / 20),
        Math.floor((Math.random() * canvasRef.current.height) / 20),
      ]);
      setScore(score + 1);
      setSnake((prev) => prev.concat([snake[snake.length - 1]]));
      setSpeed(speed > 30 ? speed - 10 : 30);
    }
  }, [snake, food, score, speed]);

  useEffect(() => {
    if (
      snake[0][0] < 0 ||
      snake[0][0] > window.innerWidth ||
      snake[0][1] < 0 ||
      snake[0][1] > window.innerHeight
    ) {
      setGameOver(true);
    }
    for (let i = 1; i < snake.length; i++) {
      if (
        snake[0][0] === snake[i][0] &&
        snake[0][1] === snake[i][1] &&
        i !== snake.length - 1
      ) {
        setGameOver(true);
      }
    }
  }, [snake]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
    }
  }, [gameOver, intervalId]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {gameOver && (
        <div className={gameOver ? "overlay" : "hidden"}>
          <GameOver score={score} />
        </div>
      )}
    </div>
  );
}

export default Game;
