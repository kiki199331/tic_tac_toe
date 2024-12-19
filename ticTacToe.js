// Purpose: Game logic for tic-tac-toe game.


// game players instance
import {Player} from './player.js';

let currentPlayer = 'O';
const players = {
    'O': new Player('O', 10000),
    'X': new Player('X', 10000),
}


// Game states
let board = Array(9).fill(null);
let gameActive = false;
let gameDecided = null;


// Observers subjects
const TurnObservers = [];
const RoundObservers = [];


// Observer pattern

const notifyTurnObservers = () => {
    TurnObservers.forEach(observer => observer.update());
};

const notifyRoundObservers = () => {
    RoundObservers.forEach(observer => observer.update());
};

const subscribeTurns = (observer) => {
    TurnObservers.push(observer);
};

const subscribeRounds = (observer) => {
    RoundObservers.push(observer);
};


// Game logic

const startGame = () => {
    gameActive = true;
    players[currentPlayer].activeTimeLeft();
    notifyRoundObservers();

};

const resetGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'O';
    gameActive = false;
    gameDecided = null;
    Object.keys(players).forEach(player => players[player].resetTime(10000));
    notifyRoundObservers();
    notifyTurnObservers();
};

const makeMove = (index) => {
    if (gameActive && !board[index]) {
        board[index] = currentPlayer;
        if (checkWin(index)) {
            gameActive = false;
            gameDecided = 'win';
        } else if (board.every(cell => cell !== null)) {
            gameActive = false;
            gameDecided = 'draw';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        players[currentPlayer].activeTimeLeft()
        notifyTurnObservers();
    }
};

const checkWin = (lastMoveIndex) => {
    const winPatterns = {
        0: [[1, 2], [3, 6], [4, 8]],
        1: [[0, 2], [4, 7]],
        2: [[0, 1], [5, 8], [4, 6]],
        3: [[4, 5], [0, 6]],
        4: [[3, 5], [1, 7], [0, 8], [2, 6]],
        5: [[3, 4], [2, 8]],
        6: [[7, 8], [0, 3], [2, 4]],
        7: [[6, 8], [1, 4]],
        8: [[6, 7], [2, 5], [0, 4]]
    }

    return winPatterns[lastMoveIndex].some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );

    // const winPatterns = [
    //     [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    //     [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    //     [0, 4, 8], [2, 4, 6] // diagonals
    // ];
    // return winPatterns.some(pattern =>
    //     pattern.every(index => board[index] === currentPlayer)
    // );

};


const getTimeLeftMs = () => {
    if (gameActive) {
        if (players[currentPlayer].getPlayerTimeLeft() <= 0) {
            return '0.000'
        }
        players[currentPlayer].updatePlayerTimeLeft();
    }
    const timeLeft = players[currentPlayer].getPlayerTimeLeft();

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const milliseconds = (timeLeft % 1000).toString().padStart(3, "0");
    return `${seconds}.${milliseconds}`

}

// Public APIs

const getBoard = () => board;
const getCurrentPlayer = () => currentPlayer;
const isGameActive = () => gameActive;
const getGameDecided = () => gameDecided;

export {
    subscribeRounds,
    subscribeTurns,
    startGame,
    resetGame,
    makeMove,
    getBoard,
    getCurrentPlayer,
    isGameActive,
    getGameDecided,
    getTimeLeftMs,
};