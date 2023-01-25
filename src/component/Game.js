import React, { useState, useRef, useEffect } from "react";
import "./../style/Game.css";
import ActionContainer from "./ActionContainer";
import GameOver from "./GameOver";

import appleIcon from "./../icons/apple-20.png";
import bananaIcon from "./../icons/banana-20.png";
import kiwiIcon from "./../icons/kiwi-20.png";
import burgerIcon from "./../icons/hamburger-20.png";
import chickenIcon from "./../icons/fried-chicken-20.png";
import cupCakeIcon from "./../icons/cupcake-20.png";
import pizzaIcon from "./../icons/pizza-20.png";

function Game() {
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
  }, [window.innerWidth, window.innerHeight]);

  // Set snake, food and special food on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.setTransform(20, 0, 0, 20, 0, 0);
    context.fillStyle = "white";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    if (gameStarted) {
      // Create a new Image element
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
  }, [snake, food, specialFood, prevFood]);

  // Read arrow key press and start game
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

  const handleStartGame = () => {
    setGameStarted(true);
    setDirection([1, 0]);
  };
  const handleAIGame = () => {
    console.log("AI Mode");
  };

  // Move sanke
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
      // // Sound effect when snake eats food
      // const eatSound = document.getElementById("eat-sound");
      // eatSound.currentTime = 0;
      // eatSound.play();

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

      setFood([
        Math.floor((Math.random() * canvasRef.current.width) / 20),
        Math.floor((Math.random() * canvasRef.current.height) / 20),
      ]);
      setSnake((prev) => prev.concat([snake[snake.length - 1]]));
      setSpeed(speed > 30 ? speed - 10 : 30);
    }
  }, [
    snake,
    food,
    specialFood,
    score,
    speed,
    canvasRef.current?.width,
    canvasRef.current?.height,
  ]);

  // Animate when snake eats food
  useEffect(() => {
    if (!foodEffect) return;
    // play effect here
    // example: adding a class to canvas to trigger css animation
    canvasRef.current.classList.add("food-effect-animation");
    setTimeout(() => {
      // remove class after animation completes
      canvasRef.current.classList.remove("food-effect-animation");
      setFoodEffect(false);
    }, 500);
  }, [foodEffect, canvasRef]);

  // Collision and game over check
  useEffect(() => {
    if (!canvasRef.current) return;
    if (
      snake[0][0] < 0 ||
      snake[0][0] > canvasRef.current.width / 20 ||
      snake[0][1] < 0 ||
      snake[0][1] > canvasRef.current.height / 20
    ) {
      handleCollision();
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
    }
  }, [gameOver, intervalId]);

  function showInstructionHandleMouseEnter() {
    setShowInstructions(true);
  }

  function showInstructionHandleMouseLeave() {
    setShowInstructions(false);
  }

  return (
    <div className="container">
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
        startAIGame={handleAIGame}
      />
      {/* <audio id="eat-sound" src="./audio/eat-sound.mp3"></audio> */}
    </div>
  );
}

export default Game;
