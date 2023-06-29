const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;
  const grid = document.querySelector(".grid");
  const player = (name, marker) => ({ name, marker });

  let player1 = player("player1", "X");
  let player2 = player("player2", "O");

  let currentPlayer = player1;
  const allGameboardButtons = [];

  function createGameBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = "";
        const gameboardButtons = document.createElement("button");
        gameboardButtons.addEventListener("click", () => {
          makeMove(i, j, gameboardButtons);
          gameboardButtons.textContent = board[i][j];
          gameController.checkWin(board);
        });
        grid.appendChild(gameboardButtons);
        allGameboardButtons.push(gameboardButtons);
      }
    }
    return allGameboardButtons;
  }
  console.log(allGameboardButtons);

  createGameBoard();

  function playerMarkerColors(button, row, col) {
    if (board[row][col] === "X") {
      button.style.color = "#39c4bf";
    } else {
      button.style.color = "#f1b142";
    }
  }

  const getBoard = function () {
    return board;
  };

  function makeMove(row, col, button) {
    if (gameController.checkValidMove(board, row, col)) {
      board[row][col] = currentPlayer.marker;
      gameController.checkWin(board);
      showWinState(currentPlayer);
      currentPlayer = gameController.switchPlayerTurn(currentPlayer);
      gameController.showPlayerTurn(currentPlayer);
      playerMarkerColors(button, row, col);
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

  function showWinState(winningPlayer) {
    const winState = document.querySelector(".win-state");
    const winnerStatus = document.querySelector(".win-lose-status");
    const winner = document.querySelector(".winner");
    const gameOverNotification = document.querySelector(".game-over");

    if (gameController.checkWin(board)) {
      winState.style.display = "block";
    }

    if (winningPlayer === player1 && checkbox.checked === true) {
      winnerStatus.textContent = `${player2.name} won`;
      winner.textContent = player1.marker;
      gameOverNotification.style.color = "#f1b142";
    } else if (winningPlayer === player2 && checkbox.checked === true) {
      winnerStatus.textContent = `${player1.name} won`;
      winner.textContent = player2.marker;
      gameOverNotification.style.color = "#39c4bf";
    } else if (winningPlayer === player1) {
      winnerStatus.textContent = `${player1.name} won`;
      winner.textContent = player1.marker;
      gameOverNotification.style.color = "#39c4bf";
    } else {
      winnerStatus.textContent = `${player2.name} won`;
      winner.textContent = player2.marker;
      gameOverNotification.style.color = "#f1b142";
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
    allGameboardButtons,
  };
})();

const gameController = (() => {
  function checkWin(board) {
    if (
      board[0][0] === gameBoard.player1.marker &&
      board[0][1] === gameBoard.player1.marker &&
      board[0][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won horizontal`);

      gameBoard.allGameboardButtons[0].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[1].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[1].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][0] === gameBoard.player2.marker &&
      board[0][1] === gameBoard.player2.marker &&
      board[0][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);

      gameBoard.allGameboardButtons[0].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[1].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[1].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      return true;
    }
    if (
      board[1][0] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[1][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won horizontal`);
      gameBoard.allGameboardButtons[3].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[3].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[5].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[5].style.color = "#1a2a32";
      return true;
    }
    if (
      board[1][0] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[1][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);
      gameBoard.allGameboardButtons[3].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[3].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[5].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[5].style.color = "#1a2a32";
      return true;
    }
    if (
      board[2][0] === gameBoard.player1.marker &&
      board[2][1] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won horizontal`);
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[7].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[7].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[2][0] === gameBoard.player2.marker &&
      board[2][1] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won horizontal`);
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[7].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[7].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][0] === gameBoard.player1.marker &&
      board[1][0] === gameBoard.player1.marker &&
      board[2][0] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
      gameBoard.allGameboardButtons[0].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[3].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[3].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][0] === gameBoard.player2.marker &&
      board[1][0] === gameBoard.player2.marker &&
      board[2][0] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
      gameBoard.allGameboardButtons[0].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[3].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[3].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][1] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][1] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
      gameBoard.allGameboardButtons[1].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[1].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[7].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[7].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][1] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][1] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
      gameBoard.allGameboardButtons[1].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[1].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[7].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[7].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][2] === gameBoard.player1.marker &&
      board[1][2] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name} won vertical`);
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[5].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[5].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][2] === gameBoard.player2.marker &&
      board[1][2] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name} won vertical`);
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[5].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[5].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][0] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][2] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name}won diagonal`);
      gameBoard.allGameboardButtons[0].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][0] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][2] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name}won diagonal`);
      gameBoard.allGameboardButtons[0].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[0].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[8].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[8].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][2] === gameBoard.player1.marker &&
      board[1][1] === gameBoard.player1.marker &&
      board[2][0] === gameBoard.player1.marker
    ) {
      console.log(`${gameBoard.player1.name}won diagonal`);
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#39c4bf";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      return true;
    }
    if (
      board[0][2] === gameBoard.player2.marker &&
      board[1][1] === gameBoard.player2.marker &&
      board[2][0] === gameBoard.player2.marker
    ) {
      console.log(`${gameBoard.player2.name}won diagonal`);
      gameBoard.allGameboardButtons[2].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[2].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[4].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[4].style.color = "#1a2a32";
      gameBoard.allGameboardButtons[6].style.backgroundColor = "#f1b142";
      gameBoard.allGameboardButtons[6].style.color = "#1a2a32";
      return true;
    }
    return false;
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
