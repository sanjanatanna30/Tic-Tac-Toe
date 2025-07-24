// let currentPlayer = "X";
// let array = Array(9).fill(null);

// function handleClick(el){
    
// const id = Number(el.id);
// array[id] =  currentPlayer;
// el.innerText = currentPlayer
// currentPlayer = currentPlayer === "X" ? "O" : "X";

// }


// let currentPlayer = "X";
// let board = Array(9).fill(null);
// let gameActive = true;

// const statusText = document.getElementById("status");

// function handleClick(cell) {
//   const id = parseInt(cell.id);

//   if (!gameActive || board[id]) return;

//   board[id] = currentPlayer;
//   cell.innerText = currentPlayer;

//   if (checkWinner()) {
//     statusText.textContent = `Winner: ${currentPlayer}`;
//     gameActive = false;
//   } else if (board.every(cell => cell)) {
//     statusText.textContent = "It's a Draw!";
//     gameActive = false;
//   } else {
//     currentPlayer = currentPlayer === "X" ? "O" : "X";
//     statusText.textContent = `Current Player: ${currentPlayer}`;
//   }
// }

// function checkWinner() {
//   const wins = [
//     [0,1,2], [3,4,5], [6,7,8],  // rows
//     [0,3,6], [1,4,7], [2,5,8],  // cols
//     [0,4,8], [2,4,6]            // diagonals
//   ];

//   return wins.some(combo => {
//     const [a, b, c] = combo;
//     return board[a] && board[a] === board[b] && board[b] === board[c];
//   });
// }

// function resetGame() {
//   board = Array(9).fill(null);
//   document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
//   currentPlayer = "X";
//   gameActive = true;
//   statusText.textContent = `Current Player: ${currentPlayer}`;
// }


// let board = Array(9).fill(null);
// let cells = document.querySelectorAll(".cell");
// let statusText = document.getElementById("status");
// let gameActive = true;

// function handleClick(cell) {
//   const id = +cell.id;
//   if (!gameActive || board[id]) return;

//   move(id, "X");
//   if (checkEnd()) return;

//   setTimeout(() => {
//     const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
//     const cpuMove = empty[Math.floor(Math.random() * empty.length)];
//     if (cpuMove !== undefined) {
//       move(cpuMove, "O");
//       checkEnd();
//     }
//   }, 300);
// }

// function move(id, player) {
//   board[id] = player;
//   document.getElementById(id).innerText = player;
// }

// function checkEnd() {
//   const win = [
//     [0,1,2],[3,4,5],[6,7,8],
//     [0,3,6],[1,4,7],[2,5,8],
//     [0,4,8],[2,4,6]
//   ];
//   for (let [a,b,c] of win)
//     if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//       statusText.textContent = `Winner: ${board[a]}`;
//       gameActive = false;
//       return true;
//     }

//   if (board.every(v => v)) {
//     statusText.textContent = "It's a Draw!";
//     gameActive = false;
//     return true;
//   }

//   statusText.textContent = "Current Player: X";
//   return false;
// }

// function resetGame() {
//   board.fill(null);
//   cells.forEach(c => c.innerText = "");
//   gameActive = true;
//   statusText.textContent = "Current Player: X";
// }



const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

// Initialize variables for the game
let player = 'X'
let isPauseGame = false
let isGameStart = false

// Array of win conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

// Array of win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
]

// Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
    // Ensure cell is empty and game isn't paused
    if (cell.textContent == '' &&
        !isPauseGame
    ) {
        isGameStart = true
        updateCell(cell, index)

        // Do a random pick if there are no results
        if (!checkWinner()) {
            changePlayer()
            randomPick()
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick() {
    // Pause the game to allow Computer to pick
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            // Ensure the chosen cell is empty
            inputCells[randomIndex] != ''
        )

        // Update the cell with Computer move
        updateCell(cells[randomIndex], randomIndex, player)
        // Check if Computer not won
        if (!checkWinner()) {
            changePlayer()
            // Swith back to Human player
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 1000) // Delay Computer move by 1 second
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        // Check each winning condition
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }
    
    // Check for a draw (if all cells are filled)
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`
    isPauseGame = true

    // Highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    )

    restartBtn.style.visibility = 'visible'
}

function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer) {
    // Ensure the game hasn't started
    if (!isGameStart) {
        // Override the selected player value
        player = selectedPlayer
        if (player == 'X') {
            // Hightlight X display
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            // Hightlight O display
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})

