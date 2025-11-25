const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const currentPlayerSpan = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScore);

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    makeMove(index);
}

function makeMove(index) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    checkGameStatus();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerSpan.textContent = currentPlayer;
    currentPlayerSpan.className = currentPlayer === 'X' ? 'player-x' : 'player-o';
}

function checkWin(player) {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === player && board[b] === player && board[c] === player;
    });
}

function checkGameStatus() {
    if (checkWin('X')) {
        gameStatus.textContent = '🎉 Player 1 (X) Wins! 🎉';
        gameStatus.classList.add('winner');
        gameActive = false;
        scores.X++;
        updateScore();
        return;
    }
    
    if (checkWin('O')) {
        gameStatus.textContent = '🎉 Player 2 (O) Wins! 🎉';
        gameStatus.classList.add('winner');
        gameActive = false;
        scores.O++;
        updateScore();
        return;
    }
    
    if (!board.includes('')) {
        gameStatus.textContent = "It's a Draw! 🤝";
        gameStatus.classList.add('draw');
        gameActive = false;
        scores.draw++;
        updateScore();
        return;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = '';
    gameStatus.classList.remove('winner', 'draw');
    updateCurrentPlayerDisplay();
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

function resetScore() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScore();
    resetGame();
}

function updateScore() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
    document.getElementById('scoreDraw').textContent = scores.draw;
    saveScores();
}

// Load scores from localStorage
function loadScores() {
    const saved = localStorage.getItem('tictactoe-scores');
    if (saved) {
        scores = JSON.parse(saved);
        updateScore();
    }
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('tictactoe-scores', JSON.stringify(scores));
}

// Initialize
loadScores();
updateCurrentPlayerDisplay();