const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;
  const grid = document.querySelector(".grid");
  const player = (name, marker) => ({ name, marker });

  let player1 = player("player1", "X");
  let player2 = player("player2", "O");

  let currentPlayer = player1;

  function createGameBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = "";
        const gameboardButtons = document.createElement("button");
        gameboardButtons.addEventListener("click", () => {
          makeMove(i, j);
          gameboardButtons.textContent = board[i][j];
          if (board[i][j] === "X") {
            gameboardButtons.style.color = "#39c4bf";
          } else {
            gameboardButtons.style.color = "#f1b142";
          }
        });
        grid.appendChild(gameboardButtons);
      }
    }
  }

  createGameBoard();

  const getBoard = function () {
    return board;
  };

  function makeMove(row, col) {
    if (gameController.checkValidMove(board, row, col)) {
      board[row][col] = currentPlayer.marker;
      gameController.checkWin(board);
      currentPlayer = gameController.switchPlayerTurn(currentPlayer);
      gameController.showPlayerTurn(currentPlayer);
      console.log(gameBoard.getBoard());
      if (gameController.checkDraw(board) && !gameController.checkWin(board)) {
        console.log("DRAW");
        console.log(gameBoard.getBoard());
      }
    } else {
      console.log("move invalid");
      console.log(gameBoard.getBoard());
    }
  }

  const checkbox = document.getElementById("toggle-checkbox");

  const swapPlayers = function (swappedPlayer) {
    if (checkbox.checked) {
      return swappedPlayer;
    }
  };

  checkbox.addEventListener("click", () => {
    player2 = swapPlayers(player1, (player1 = player2));
    currentPlayer = player1;
    gameController.showPlayerTurn(currentPlayer);
    console.log(currentPlayer);
    console.log(player1);
    console.log(player2);
  });

  const newGameScreen = document.querySelector(".new-game-screen");
  const gameboardUi = document.querySelector(".gameboard");

  function startNewGame() {
    const newGameButton = document.querySelector(".new-game-btn");

    newGameButton.addEventListener("click", () => {
      setTimeout(() => {
        newGameScreen.style.display = "none";
        gameboardUi.style.display = "block";
      }, 200);
    });
  }
  startNewGame();

  function goBackToPlayerSelection() {
    const backBtn = document.querySelector(".back-btn");

    backBtn.addEventListener("click", () => {
      setTimeout(() => {
        gameboardUi.style.display = "none";
        newGameScreen.style.display = "flex";
        gameController.resetBoard(board);
      }, 200);
    });
  }
  goBackToPlayerSelection();

  return {
    board,
    getBoard,
    makeMove,
    player1,
    player2,
    currentPlayer,
  };
})();

const gameController = (() => {
  function checkWin(board) {
    if (
      board[0][0] === gameBoard.player1.marker &&
      board[0][1] === gameBoard.player1.marker &&
      board[0][2] === gameBoard.player1.marker
    ) {
      // return "You Won";
      console.log(`${gameBoard.player1.name} won horizontal`);
    } else if (
      board[0][0] === gameBoard.player2.marker &&
      board[0][1] === gameBoard.player2.marker &&
      board[0][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);
    } else if (
      board[1][0] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[1][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won horizontal`);
    } else if (
      board[1][0] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[1][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);
    } else if (
      board[2][0] === gameBoard.player1.marker &&
      board[2][1] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won horizontal`);
    } else if (
      board[2][0] === gameBoard.player2.marker &&
      board[2][1] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);
    } else if (
      board[0][0] === gameBoard.player1.marker &&
      board[1][0] === gameBoard.player1.marker &&
      board[2][0] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
    } else if (
      board[0][0] === gameBoard.player2.marker &&
      board[1][0] === gameBoard.player2.marker &&
      board[2][0] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
    } else if (
      board[0][1] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][1] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
    } else if (
      board[0][1] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][1] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
    } else if (
      board[0][2] === gameBoard.player1.marker &&
      board[1][2] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
    } else if (
      board[0][2] === gameBoard.player2.marker &&
      board[1][2] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
    } else if (
      board[0][0] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name}won diagonal`);
    } else if (
      board[0][0] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name}won diagonal`);
    } else if (
      board[0][2] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][0] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name}won diagonal`);
    } else if (
      board[0][2] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][0] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name}won diagonal`);
    }
  }

  function checkDraw(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  function checkValidMove(board, row, col) {
    if (board[row][col] === "") {
      return true;
    }
    return false;
  }

  function switchPlayerTurn(currentPlayer) {
    if (currentPlayer === gameBoard.player1) {
      return gameBoard.player2;
    }
    return gameBoard.player1;
  }

  function showPlayerTurn(currentPlayer) {
    const currentMarker = document.querySelector(".current-player-marker");

    if (currentPlayer === gameBoard.player1) {
      currentMarker.textContent = gameBoard.player1.marker;
    } else if (currentPlayer === gameBoard.player2) {
      currentMarker.textContent = gameBoard.player2.marker;
    }
  }
  showPlayerTurn(gameBoard.currentPlayer);

  function resetBoard(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  }

  return {
    checkWin,
    switchPlayerTurn,
    checkDraw,
    checkValidMove,
    resetBoard,
    showPlayerTurn,
  };
})();
