const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;
  const grid = document.querySelector(".grid");
  const gameboardButtonsArray = [];
  const player = (name, marker) => ({ name, marker });

  const player1 = player("player1", "X");
  const player2 = player("player2", "O");

  let currentPlayer = player1;

  function createGameBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = "";
        const gameboardButtons = document.createElement("button");
        gameboardButtons.addEventListener("click", () => {
          makeMove(currentPlayer, i, j);
        });
        gameboardButtonsArray.push(gameboardButtons);
        grid.appendChild(gameboardButtons);
      }
    }
  }

  createGameBoard();

  const getBoard = function () {
    return board;
  };

  function makeMove(player, row, col) {
    if (gameController.checkValidMove(board, row, col)) {
      board[row][col] = player.marker;
      gameController.checkWin(board);
      currentPlayer = gameController.switchPlayerTurn(currentPlayer);
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
  return {
    checkWin,
    switchPlayerTurn,
    checkDraw,
    checkValidMove,
  };
})();
