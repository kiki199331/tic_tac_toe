# Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game implemented in JavaScript.
The game allows two players(named 'O', 'X') to play against each other, with a timer for each player.

## Features

- Two-player Tic-Tac-Toe game
- Timer for each player
- Hover effect to show the current player's move
- Alerts for game results (win or draw)
- Reset and start game functionality

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kiki199331/tic-tac-toe.git
    ```
2. Navigate to the project directory:
    ```sh
    cd tic-tac-toe
    ```

3. Live demo:
    ```sh
    https://stackblitz.com/edit/stackblitz-starters-9uynzvs6?embed=1&file=index.html&hideExplorer=1&hideNavigation=1&view=preview
    ```

## Usage

1. Open `index.html` in your web browser.
2. Click the "開始" button to start the game.
3. The current player's time left is displayed and updated in real-time.
4. Hover over an empty cell to see your next move.
5. Players take turns clicking on the cells to make your moves(marked).
6. Click the "重置" button to reset the game.

## Project Structure

- `index.html`: The main HTML file that contains the game layout.
- `styles.css`: The CSS file for styling the game.
- `index.js`: The main JavaScript file that initializes the game.
- `UIController.js`: Manages the UI updates and interactions.
- `ticTacToe.js`: Contains the game logic.
- `player.js`: Defines the `Player` class used in the game.