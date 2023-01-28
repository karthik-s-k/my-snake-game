# my-snake-game (The Great Munch)

A fun snake-food game awaits players who take control of a snake that moves around the screen and eats food, with the ultimate goal of growing as long as possible without running into the walls or its own body. Built using React JS, this game utilizes the React hooks useState and useEffect to efficiently handle state updates and side effects.

Try your hand at "The Great Munch" now by visiting the link: https://karthik-s-k.github.io/my-snake-game/

Players can look forward to several exciting features, including:

- Different types of food (fruits & special food) that, when consumed, cause the snake to grow in length and experience a boost in speed.
- The option to play using arrow keys from the keyboard, or use the automatic play feature, in which the snake moves on its own using a pathfinding library to find the shortest path to the food.
- A dynamic game canvas that adjusts to the size of the browser window.
- A score counter that displays the total score, number of fruits consumed, and number of special food consumed.
- A game over state triggered when the snake collides with the wall or its own body.
- Overall, this game offers a challenging and engaging experience for players of all skill levels.

## Auto play Mode

- In PathFinding.js, the predefined heuristics are PF.Heuristic.manhattan, PF.Heuristic.chebyshev, PF.Heuristic.euclidean and PF.Heuristic.octile.
- I am using the default, PF.Heuristic.manhattan to find the path between snake head and food in the canvas (avoiding the snake path over its body)

## Getting Started

To get started, simply clone or download the repository and run the game locally on your machine.

- git clone https://github.com/karthik-s-k/my-snake-game.git
- cd my-snake-game

## Prerequisites

In order to run the game, you will need to have the following installed on your machine:

- Node.js
- npm (or yarn)

## Installing

To install the dependencies for the game, run the following command in the root directory of the project:

npm install or yarn install

## Running the game

To start the game, run the following command in the root directory of the project:

npm start or yarn start

## Deployment

To deploy the game to GitHub pages, you need to build the project and push the built files to the gh-pages branch.

npm run build or yarn build

Then, switch to gh-pages branch and push the files

- git checkout gh-pages
- git push origin gh-pages

## Built With

- [React](https://reactjs.org/) - The JavaScript library used for building the user interface
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - The HTML5 canvas element used for rendering the game

## Author

[Karthik SK](https://github.com/karthik-s-k)

## License

Feel free to use the code.

## Credits

- PathFinding.js (https://github.com/qiao/PathFinding.js)
- Icons from FlatIcon & FreeIcons (https://www.flaticon.com/, https://freeicons.io/)
