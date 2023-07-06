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
      if (isNewGameVsBot) {
        makeRandomBotMove();
      }
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

  function reCheckWinToApplyButtonStylesCorrectly() {
    if (gameController.checkWin(board)) {
      setTimeout(() => {
        gameController.checkWin(board);
      }, 10);
    }
  }

  function makeRandomBotMove() {
    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length > 0 && !gameController.checkWin(board)) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomIndex];

      setTimeout(() => {
        board[row][col] = player2.marker;
        const button = allGameboardButtons[row * 3 + col];
        button.textContent = player2.marker;
        reCheckWinToApplyButtonStylesCorrectly();
        showWinState(currentPlayer);
        currentPlayer = gameController.switchPlayerTurn(currentPlayer);
        gameController.showPlayerTurn(currentPlayer);
        playerMarkerColors(button, row, col);
      }, 400);
    }
  }

  const winState = document.querySelector(".win-state");
  const winnerStatus = document.querySelector(".win-lose-status");
  const winner = document.querySelector(".winner");
  const gameOverNotification = document.querySelector(".game-over");
  let player1Score = 0;
  let player2Score = 0;
  let drawScore = 0;
  const winIndicatorX = document.querySelector(".x");
  const winIndicatorO = document.querySelector(".o");
  const drawIndicator = document.querySelector(".draw");

  function showWinState(winningPlayer) {
    if (gameController.checkWin(board)) {
      winState.style.display = "block";
      gameboardUi.style.opacity = "0.5";

      if (winningPlayer === player1 && checkbox.checked === true) {
        winnerStatus.textContent = `${player2.name} won`;
        winner.textContent = player1.marker;
        gameOverNotification.style.color = "#f1b142";
        player2Score += 1;
        winIndicatorO.textContent = player2Score;
      } else if (winningPlayer === player2 && checkbox.checked === true) {
        winnerStatus.textContent = `${player1.name} won`;
        winner.textContent = player2.marker;
        gameOverNotification.style.color = "#39c4bf";
        player1Score += 1;
        winIndicatorX.textContent = player1Score;
      } else if (winningPlayer === player1) {
        winnerStatus.textContent = `${player1.name} won`;
        winner.textContent = player1.marker;
        gameOverNotification.style.color = "#39c4bf";
        player1Score += 1;
        winIndicatorX.textContent = player1Score;
      } else {
        winnerStatus.textContent = `${player2.name} won`;
        winner.textContent = player2.marker;
        gameOverNotification.style.color = "#f1b142";
        player2Score += 1;
        winIndicatorO.textContent = player2Score;
      }
    }
    if (gameController.checkDraw(board) && !gameController.checkWin(board)) {
      winState.style.display = "block";
      gameboardUi.style.opacity = "0.5";
      winnerStatus.textContent = "It's a Draw";
      winner.textContent = "Nobody";
      gameOverNotification.style.color = "#a9bfc9";
      drawScore += 1;
      drawIndicator.textContent = drawScore;
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
        currentPlayer = player1;
        gameController.showPlayerTurn(currentPlayer);
      }, 200);
    });
  }
  startNewGame();

  let isNewGameVsBot = false;
  function startNewGameVsBot() {
    const newGameButtonVsBot = document.querySelector(".vs-bot");

    newGameButtonVsBot.addEventListener("click", () => {
      setTimeout(() => {
        isNewGameVsBot = true;
        newGameScreen.style.display = "none";
        gameboardUi.style.display = "block";
        currentPlayer = player1;
        gameController.showPlayerTurn(currentPlayer);
      }, 200);
    });
  }
  startNewGameVsBot();

  function goBackToPlayerSelection() {
    const backBtn = document.querySelector(".back-btn");

    backBtn.addEventListener("click", () => {
      setTimeout(() => {
        gameboardUi.style.display = "none";
        newGameScreen.style.display = "flex";
        gameController.resetBoard(board);
        player1Score = 0;
        winIndicatorX.textContent = "0";
        player2Score = 0;
        winIndicatorO.textContent = "0";
        drawScore = 0;
        drawIndicator.textContent = "0";
        isNewGameVsBot = false;
      }, 200);
    });
  }
  goBackToPlayerSelection();

  function startNextRound() {
    const nextRoundBtn = document.querySelector(".next-round");

    nextRoundBtn.addEventListener("click", () => {
      setTimeout(() => {
        winState.style.display = "none";
        gameboardUi.style.opacity = "1";
        gameController.resetBoard(board);
        allGameboardButtons[0].style.backgroundColor = "#203640";
        allGameboardButtons[1].style.backgroundColor = "#203640";
        allGameboardButtons[2].style.backgroundColor = "#203640";
        allGameboardButtons[3].style.backgroundColor = "#203640";
        allGameboardButtons[4].style.backgroundColor = "#203640";
        allGameboardButtons[5].style.backgroundColor = "#203640";
        allGameboardButtons[6].style.backgroundColor = "#203640";
        allGameboardButtons[7].style.backgroundColor = "#203640";
        allGameboardButtons[8].style.backgroundColor = "#203640";
        currentPlayer = player1;
        gameController.showPlayerTurn(currentPlayer);
      }, 200);
    });
  }
  startNextRound();

  function quitToMainMenu() {
    const quitBtn = document.querySelector(".quit");

    quitBtn.addEventListener("click", () => {
      setTimeout(() => {
        winState.style.display = "none";
        gameboardUi.style.display = "none";
        gameboardUi.style.opacity = "1";
        newGameScreen.style.display = "flex";
        gameController.resetBoard(board);
        currentPlayer = player1;
        gameController.showPlayerTurn(currentPlayer);
        allGameboardButtons[0].style.backgroundColor = "#203640";
        allGameboardButtons[1].style.backgroundColor = "#203640";
        allGameboardButtons[2].style.backgroundColor = "#203640";
        allGameboardButtons[3].style.backgroundColor = "#203640";
        allGameboardButtons[4].style.backgroundColor = "#203640";
        allGameboardButtons[5].style.backgroundColor = "#203640";
        allGameboardButtons[6].style.backgroundColor = "#203640";
        allGameboardButtons[7].style.backgroundColor = "#203640";
        allGameboardButtons[8].style.backgroundColor = "#203640";
        player1Score = 0;
        winIndicatorX.textContent = "0";
        player2Score = 0;
        winIndicatorO.textContent = "0";
        drawScore = 0;
        drawIndicator.textContent = "0";
        isNewGameVsBot = false;
      }, 200);
    });
  }
  quitToMainMenu();

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
        gameBoard.allGameboardButtons[0].textContent = "";
        gameBoard.allGameboardButtons[1].textContent = "";
        gameBoard.allGameboardButtons[2].textContent = "";
        gameBoard.allGameboardButtons[3].textContent = "";
        gameBoard.allGameboardButtons[4].textContent = "";
        gameBoard.allGameboardButtons[5].textContent = "";
        gameBoard.allGameboardButtons[6].textContent = "";
        gameBoard.allGameboardButtons[7].textContent = "";
        gameBoard.allGameboardButtons[8].textContent = "";
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
