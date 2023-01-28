# my-snake-game (The Great Munch)

A fun snake-food game where the player controls a snake that moves around the screen and eats food, with the goal of growing as long as possible without running into the walls or its own body.
The game is built in React JS, it uses the React hooks useState and useEffect to handle state updates and side effects.

The game has several features such as,

- The size of the game canvas adjusts to the size of the browser window
- The game has different types of food, some of which give a temporary boost of speed or make the snake grow faster
- There is a game over state when the snake collides with the wall or its own body
- The game has a score counter
- The game has a option for auto play, where the snake moves automatically.
- The game uses pathfinding library to find the shortest path to the food in auto play mode.

## Getting Started

To get started, simply clone or download the repository and run the game locally on your machine.

git clone https://github.com/karthik-s-k/my-snake-game.git
cd my-game

## Prerequisites

In order to run the game, you will need to have the following installed on your machine:

- Node.js
- npm (or yarn)

## Installing

To install the dependencies for the game, run the following command in the root directory of the project:

npm install
or
yarn install

## Running the game

To start the game, run the following command in the root directory of the project:

npm start
or
yarn start

## Deployment

To deploy the game to a server, you can use a platform such as Heroku. First, create a new app on Heroku and link it to your Github repository. Then, set up the necessary environment variables and deploy the app.

## Built With

- [React](https://reactjs.org/) - The JavaScript library used for building the user interface
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - The HTML5 canvas element used for rendering the game

## Author

- [Karthik SK](https://github.com/karthik-s-k)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Credits
PathFinding.js (https://github.com/qiao/PathFinding.js)
Icons from FlatIcon & FreeIcons (https://www.flaticon.com/, https://freeicons.io/)
