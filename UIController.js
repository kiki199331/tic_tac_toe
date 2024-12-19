import {
    subscribeRounds,
    subscribeTurns,
    startGame,
    resetGame,
    makeMove,
    getBoard,
    getCurrentPlayer,
    isGameActive,
    getGameDecided,
    getWinner,
    getTimeLeftMs
} from './ticTacToe.js';


// UI elements (DOM)

const boardElement = document.getElementById('board');
const currentPlayerElement = document.getElementById('currentPlayer');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const playerTimeLeftElements = {
    'O': document.getElementById('timeLeftPlayer1'),
    'X': document.getElementById('timeLeftPlayer2')
}

// UI update functions

const updateGameInfo = () => {
    // Update the game board data to the UI
    const board = getBoard();
    board.forEach((cell, index) => {
        const cellElement = boardElement.children[index];
        cellElement.textContent = cell;
    });
    // Update the current player data to the UI
    currentPlayerElement.textContent = getCurrentPlayer();

    const gameDecided = getGameDecided();
    if (gameDecided !== null) {
        gameDecidedAlert(getGameDecided(), getWinner())
    }

};

const gameDecidedAlert = (gameDecided, winner) => {
    // Check winner
    if (gameDecided === 'draw') {
        setTimeout(() => alert('平手'), 0);
    } else {
        setTimeout(() => alert(`贏家是${winner}`), 100);
    }
}

const updateButtons = () => {
    startButton.disabled = isGameActive();
    restartButton.disabled = !isGameActive();
};

/**
 * @player {string} [arg] - update all the PlayerTimeLefts if arg is not provided
 * @returns {void}
 */
const updatePlayerTimeLefts = (player) => {
    const updatePlayers = player ? [player] : Object.keys(playerTimeLeftElements);
    updatePlayers.forEach(player => {
        playerTimeLeftElements[player].textContent = getTimeLeftMs()
    });

}


// Timer functions

const startUpdateTimeLeft = () => {
    if (isGameActive()) {
        function updateUI() {
            // update until the time runs out or the game is over
            if (getTimeLeftMs() >= 0 ) {
                // Update the player's time left
                updatePlayerTimeLefts(getCurrentPlayer());
                if(!isGameActive() && getGameDecided() === 'timeout'){
                    gameDecidedAlert(getGameDecided(), getWinner());
                    return;
                }
                // Request the next frame
                requestAnimationFrame(updateUI);
            }
        }
        updateUI();
    }
}

// Add event listeners for hover effect
const addHoverEffect = () => {
    boardElement.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('cell') && !event.target.textContent) {
            event.target.textContent = getCurrentPlayer();
        }
    });

    boardElement.addEventListener('mouseout', (event) => {
        const board = getBoard();
        const markedContext = board[event.target.dataset.index];
        if (event.target.classList.contains('cell') && event.target.textContent === getCurrentPlayer() && markedContext === null) {
            event.target.textContent = '';
        }
    });
};


// Initialization

const init = () => {
    // Add event listeners
    boardElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) { // click event occurs on the game board cell
            const index = event.target.dataset.index;
            makeMove(index);
        }
    });
    startButton.addEventListener('click', () => {
        startGame();
        startUpdateTimeLeft();
    });
    restartButton.addEventListener('click', () => {
        resetGame();
        updatePlayerTimeLefts();
    });
    addHoverEffect();

    // Add observer
    subscribeRounds({update: updateButtons});
    subscribeTurns({update: updateGameInfo});

    resetGame();
};

export {init};