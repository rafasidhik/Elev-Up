let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

function drawBoard() {
    boardDiv.innerHTML = "";
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        // Applied styling classes based on the current cell state
        if (cell === "") {
            div.className = "cell empty";
        } else {
            div.className = `cell ${cell}`;
        }
        div.innerText = cell;
        div.onclick = () => handleClick(index);
        boardDiv.appendChild(div);
    });
}

function handleClick(index) {
    if (board[index] !== "" || gameOver) return;
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    drawBoard();
    if (!gameOver && document.getElementById("mode").value === "ai" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = "O";
    checkWinner();
    currentPlayer = "X";
    drawBoard();
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = `${board[a]} Wins! 🎉`;
            gameOver = true;
            return;
        }
    }
    if (!board.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameOver = true;
        return;
    }
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    statusText.innerText = "Player X's Turn";
    drawBoard();
}

drawBoard();