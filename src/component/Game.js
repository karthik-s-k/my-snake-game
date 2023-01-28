import React, { useState, useRef, useEffect } from "react";
import "./../style/Game.css";
import ActionContainer from "./ActionContainer";
import GameOver from "./GameOver";
import StartGame from "./StartGame";

import appleIcon from "./../icons/apple-20.png";
import bananaIcon from "./../icons/banana-20.png";
import kiwiIcon from "./../icons/kiwi-20.png";
import burgerIcon from "./../icons/hamburger-20.png";
import chickenIcon from "./../icons/fried-chicken-20.png";
import cupCakeIcon from "./../icons/cupcake-20.png";
import pizzaIcon from "./../icons/pizza-20.png";

import * as PF from "pathfinding";

function Game() {
  const CELL_SIZE = 20;
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(70);
  const [specialFood, setSpecialFood] = useState(false);
  const [collisionAnimation, setCollisionAnimation] = useState(false);
  const [foodEffect, setFoodEffect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [prevFood, setPrevFood] = useState([-1, -1]);
  const foodImages = [appleIcon, bananaIcon, kiwiIcon];
  const [selectedFoodImage, setSelectedFoodImage] = useState(
    foodImages[Math.floor(Math.random() * foodImages.length)]
  );
  const specialFoodImages = [burgerIcon, chickenIcon, cupCakeIcon, pizzaIcon];
  const [selectedSpecialFoodImage, setSelectedSpecialFoodImage] = useState(
    specialFoodImages[Math.floor(Math.random() * specialFoodImages.length)]
  );
  const [foodEatenCount, setFoodEatenCount] = useState(0);
  const [specialFoodEatenCount, setSpecialFoodEatenCount] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);

  // Set/resize canvas size
  useEffect(() => {
    const handleResize = () => {
      canvasRef.current.width = window.innerWidth * 0.75;
      canvasRef.current.height = window.innerHeight * 0.9;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set snake, food and special food on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.setTransform(CELL_SIZE, 0, 0, CELL_SIZE, 0, 0);
    context.fillStyle = "white";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    if (gameStarted) {
      if (autoPlay) {
        autoPlayPathFinder();
      }
      // Create a new image for food
      const foodImage = new Image();
      if (specialFood) {
        foodImage.src = selectedSpecialFoodImage;
      } else {
        foodImage.src = selectedFoodImage;
      }
      foodImage.onload = () => {
        if (prevFood[0] !== -1) {
          context.clearRect(prevFood[0], prevFood[1], 1, 1);
        }
        context.drawImage(foodImage, food[0], food[1], 1, 1);
        setPrevFood(food);
      };
    }
  }, [
    snake,
    food,
    specialFood,
    prevFood,
    gameStarted,
    selectedFoodImage,
    selectedSpecialFoodImage,
    autoPlay,
  ]);

  // Read arrow key press and start game
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
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
        setManualPlay(true);
      setGameStarted(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Move snake
  useEffect(() => {
    if (!gameStarted) return;
    const move = setInterval(() => {
      const newSnakeHead = [
        snake[0][0] + direction[0],
        snake[0][1] + direction[1],
      ];
      const newSnake = [newSnakeHead, ...snake.slice(0, -1)];
      setSnake(newSnake);

      // Clear the previous position of the snake's tail
      const context = canvasRef.current.getContext("2d");
      context.clearRect(
        snake[snake.length - 1][0],
        snake[snake.length - 1][1],
        1,
        1
      );
    }, speed);
    setIntervalId(move);
    return () => clearInterval(move);
  }, [gameStarted, direction, snake, speed]);

  // Set food, special food and score
  useEffect(() => {
    if (!canvasRef.current) return;
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
      // Animate canvas when snake eats food
      setFoodEffect(true);

      // Generate special food
      const chance = Math.random();
      if (chance <= 0.25) {
        setSpecialFood(true);
      } else {
        setSpecialFood(false);
      }
      if (specialFood) {
        setSpecialFoodEatenCount(specialFoodEatenCount + 1);
        setScore(score + 5);
        const randomSpecialFoodImage =
          specialFoodImages[
            Math.floor(Math.random() * specialFoodImages.length)
          ];
        setSelectedSpecialFoodImage(randomSpecialFoodImage);
      } else {
        setFoodEatenCount(foodEatenCount + 1);
        setScore(score + 1);
        const randomFoodImage =
          foodImages[Math.floor(Math.random() * foodImages.length)];
        setSelectedFoodImage(randomFoodImage);
      }

      setSnake((prev) => prev.concat([snake[snake.length - 1]]));
      setSpeed(!autoPlay && speed > 30 ? speed - 10 : 30);
      const foodPosition = generateFood();
      if (
        (foodPosition.x == null || foodPosition.x == undefined) &&
        (foodPosition.y == null || foodPosition.y == undefined)
      ) {
        console.log(foodPosition);
        setGameOver(true);
      } else {
        setFood([foodPosition.x, foodPosition.y]);
      }
    }
  }, [
    snake,
    food,
    specialFood,
    score,
    speed,
    canvasRef.current?.width,
    canvasRef.current?.height,
    foodImages,
    specialFoodImages,
    foodEatenCount,
    specialFoodEatenCount,
    autoPlay,
  ]);

  // Animate when snake eats food
  useEffect(() => {
    if (!foodEffect) return;
    canvasRef.current.classList.add("food-effect-animation");
    setTimeout(() => {
      canvasRef.current.classList.remove("food-effect-animation");
      setFoodEffect(false);
    }, 500);
  }, [foodEffect, canvasRef]);

  // Collision and game over check
  useEffect(() => {
    if (!canvasRef.current) return;
    if (
      snake[0][0] < 0 ||
      snake[0][0] > canvasRef.current.width / CELL_SIZE ||
      snake[0][1] < 0 ||
      snake[0][1] > canvasRef.current.height / CELL_SIZE
    ) {
      handleCollision();
    }
    if (!autoPlay) {
      for (let i = 1; i < snake.length; i++) {
        if (
          snake[0][0] === snake[i][0] &&
          snake[0][1] === snake[i][1] &&
          i !== snake.length - 1
        ) {
          setGameOver(true);
        }
      }
    }
  }, [
    snake,
    gameOver,
    autoPlay,
    canvasRef.current?.width,
    canvasRef.current?.height,
  ]);

  // Check if the snake's head has collided with the canvas wall
  const handleCollision = () => {
    setCollisionAnimation(true);
    setGameOver(true);
    clearInterval(intervalId);
  };
  const canvasClass = collisionAnimation ? "collision-animation" : "";

  useEffect(() => {
    if (!collisionAnimation) return;
    // play animation here
    setTimeout(() => {
      setCollisionAnimation(false);
    }, 500);
  }, [collisionAnimation]);

  // Clear interval to stop the game
  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
      setAutoPlay(false);
    }
  }, [gameOver, intervalId]);

  function showInstructionHandleMouseEnter() {
    setShowInstructions(true);
  }

  function showInstructionHandleMouseLeave() {
    setShowInstructions(false);
  }

  const handleStartGame = () => {
    if (autoPlay) {
      setAutoPlay(false);
    }
    if (manualPlay) {
      setGameStarted(false);
      setManualPlay(false);
    } else {
      setGameStarted(true);
      setManualPlay(true);
    }
    setDirection([1, 0]);
  };

  const handleAutoPlayGame = () => {
    if (manualPlay) {
      setManualPlay(false);
    }
    if (autoPlay) {
      setGameStarted(false);
      setAutoPlay(false);
    } else {
      setGameStarted(true);
      setAutoPlay(true);
    }
  };

  // find path between snake and food to auto play game
  function autoPlayPathFinder() {
    const grid = new PF.Grid(
      Math.floor(canvasRef.current.width),
      Math.floor(canvasRef.current.height)
    );
    for (let i = 0; i < snake.length; i++) {
      grid.setWalkableAt(snake[i][0], snake[i][1], false);
    }

    const finder = new PF.AStarFinder();

    // The predefined heuristics are PF.Heuristic.manhattan(default), PF.Heuristic.chebyshev, PF.Heuristic.euclidean and PF.Heuristic.octile.
    // const finder = new PF.AStarFinder({
    //   heuristic: PF.Heuristic.chebyshev,
    // });

    const path = finder.findPath(
      snake[0][0],
      snake[0][1],
      food[0],
      food[1],
      grid
    );
    if (path.length > 0) {
      const nextMove = path[1] || path[0];
      setSnake([nextMove, ...snake.slice(0, -1)]);

      // Clear the previous position of the snake's tail
      const context = canvasRef.current.getContext("2d");
      context.clearRect(
        snake[snake.length - 1][0],
        snake[snake.length - 1][1],
        1,
        1
      );
    } else {
      setAutoPlay(false);
      setGameOver(true);
    }
  }

  // Check to avoid placing food over snake body
  function generateFood() {
    let foodX, foodY;
    do {
      foodX = Math.floor((Math.random() * canvasRef.current.width) / CELL_SIZE);
      foodY = Math.floor(
        (Math.random() * canvasRef.current.height) / CELL_SIZE
      );
    } while (
      snake.some((segment) => segment.x === foodX && segment.y === foodY)
    );

    return { x: foodX, y: foodY };
  }

  return (
    <div className="container">
      {!gameStarted ? <StartGame /> : ""}
      {gameOver && (
        <div className={gameOver ? "overlay" : "hidden"}>
          <GameOver score={score} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={window.innerWidth * 0.75}
        height={window.innerHeight * 0.9}
        className={canvasClass}
      />
      <ActionContainer
        score={score}
        foodEatenCount={foodEatenCount}
        specialFoodEatenCount={specialFoodEatenCount}
        showInstructions={showInstructions}
        showInstructionHandleMouseEnter={showInstructionHandleMouseEnter}
        showInstructionHandleMouseLeave={showInstructionHandleMouseLeave}
        startGame={handleStartGame}
        startAutoPlay={handleAutoPlayGame}
        manualPlay={manualPlay}
        autoPlay={autoPlay}
      />
    </div>
  );
}

export default Game;
