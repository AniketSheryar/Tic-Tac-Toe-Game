const boxs = document.querySelectorAll(".box");
const turn = document.getElementById("turn");
const result = document.getElementById("result");
let currentplayer = "X";
let gameboard = ["", "", "", "", "", "", "", "", ""];
let gameactive = true;

function handleClick(index) {
  if (!gameactive || gameboard[index] !== "") {
    return;
  }

  gameboard[index] = currentplayer;
  boxs[index].innerText = currentplayer;
  checkwin();
  currentplayer = currentplayer === "X" ? "O" : "X";
  turn.innerText = `Turn ${currentplayer}`;
}

// function to check win or draw
function checkwin() {
  const winningcobinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningcobinations) {
    const [a, b, c] = combination;

    if (
      gameboard[a] &&
      gameboard[a] === gameboard[b] &&
      gameboard[a] === gameboard[c]
    ) {
      gameactive = false;
      result.innerText = `${currentplayer} wins!`;
      turn.style.display = "none";
      break;
    }
  }

  // function to check if its not a win then is there any space left
  function hasEmptySpaces(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i] === "") {
        return true;
      }
    }
    return false;
  }

  // function to declare Its a draw
  if (!hasEmptySpaces(gameboard) && result.innerText === "") {
    turn.style.display = "none";
    result.innerText = "It's a Draw!";
  }
}

// function to reset the game
function reset() {
  gameactive = true;
  gameboard = ["", "", "", "", "", "", "", "", ""];
  currentplayer = "X";
  turn.innerText = `Turn ${currentplayer}`;
  boxs.forEach((boxs) => (boxs.innerText = ""));
  result.innerText = "";
  turn.style.display = "block";
}

reset();
