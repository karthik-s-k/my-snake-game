import React, { useState, useRef, useEffect } from "react";
import GameOver from "./GameOver";
import "./Game.css";
import "./Score.css";

function Game() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(100);
  const [specialFood, setSpecialFood] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      canvasRef.current.width = window.innerWidth * 0.75;
      canvasRef.current.height = window.innerHeight * 0.8;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.setTransform(20, 0, 0, 20, 0, 0);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.fillStyle = "green";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    if (specialFood) {
      context.fillStyle = "yellow";
    } else {
      context.fillStyle = "red";
    }
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food, specialFood]);

  useEffect(() => {
    if (!gameStarted) return;
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
  }, [gameStarted, direction, snake, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return; // check if the game has started
      if (e.keyCode === 37) setDirection([-1, 0]);
      if (e.keyCode === 38) setDirection([0, -1]);
      if (e.keyCode === 39) setDirection([1, 0]);
      if (e.keyCode === 40) setDirection([0, 1]);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted]); // only run this effect when gameStarted changes

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40
      )
        setGameStarted(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
      setFood([
        Math.floor((Math.random() * canvasRef.current.width) / 20),
        Math.floor((Math.random() * canvasRef.current.height) / 20),
      ]);
      setScore(score + 1);
      setSnake((prev) => prev.concat([snake[snake.length - 1]]));
      setSpeed(speed > 30 ? speed - 10 : 30);
    }
  }, [
    snake,
    food,
    score,
    speed,
    canvasRef.current?.width,
    canvasRef.current?.height,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
      const chance = Math.random();
      if (chance <= 0.15) {
        setSpecialFood(true);
      } else {
        setSpecialFood(false);
      }
      if (specialFood) {
        setScore(score + 5);
      }
      setFood([
        Math.floor((Math.random() * canvasRef.current.width) / 20),
        Math.floor((Math.random() * canvasRef.current.height) / 20),
      ]);
    }
  }, [
    snake,
    food,
    specialFood,
    score,
    canvasRef.current?.width,
    canvasRef.current?.height,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (
      snake[0][0] < 0 ||
      snake[0][0] > canvasRef.current.width / 20 ||
      snake[0][1] < 0 ||
      snake[0][1] > canvasRef.current.height / 20
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
  }, [snake, gameOver, canvasRef.current?.width, canvasRef.current?.height]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
    }
  }, [gameOver, intervalId]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth * 0.75}
        height={window.innerHeight * 0.8}
      />
      <div className="score-container">
        <p>Score: {score}</p>
      </div>
      {useEffect(() => {
        if (!canvasRef.current) return;
        setFood([
          Math.floor((Math.random() * canvasRef.current.width) / 20),
          Math.floor((Math.random() * canvasRef.current.height) / 20),
        ]);
      }, [canvasRef.current?.width, canvasRef.current?.height])}
      {gameOver && (
        <div className={gameOver ? "overlay" : "hidden"}>
          <GameOver score={score} />
        </div>
      )}
    </div>
  );
}

export default Game;
