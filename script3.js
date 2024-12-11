

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;


const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const statusDisplay = document.getElementById('status');


cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});


restartBtn.addEventListener('click', restartGame);


function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] !== '' || gameOver) return; 

  
  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  
  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (gameBoard.every(cell => cell !== '')) {
    statusDisplay.textContent = "It's a draw!";
    gameOver = true;
  } else {
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}


function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}


function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  statusDisplay.textContent = `Player X's turn`;

  cells.forEach(cell => {
    cell.textContent = '';
  });
}