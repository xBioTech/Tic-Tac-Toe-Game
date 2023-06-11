const gameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;

  function createGameBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = "";
      }
    }
  }

  const getBoard = function () {
    return board;
  };

  function makeMove(player, row, col) {
    if (gameController.checkValidMove(board, row, col)) {
      board[row][col] = player.marker;
      gameController.checkWin(board);
      currentPlayer = gameController.switchPlayerTurn();
      if (gameController.checkDraw(board) && !gameController.checkWin(board)) {
        console.log("DRAW");
      }
    } else {
      console.log("move invalid");
    }
  }

  createGameBoard();

  return {
    board,
    getBoard,
    makeMove,
  };
})();

const player = (name, marker) => ({ name, marker });

const player1 = player("john", "X");
const player2 = player("jane", "O");

let currentPlayer = player1;

const gameController = (() => {
  function checkWin(board) {
    if (
      board[0][0] === player1.marker &&
      board[0][1] === player1.marker &&
      board[0][2] === player1.marker
    ) {
      // return "You Won";
      console.log(`${player1.name} won horizontal`);
    } else if (
      board[0][0] === player2.marker &&
      board[0][1] === player2.marker &&
      board[0][2] === player2.marker
    ) {
      console.log(`${player2.name} won horizontal`);
    } else if (
      board[1][0] === player1.marker &&
      board[1][1] === player1.marker &&
      board[1][2] === player1.marker
    ) {
      console.log(`${player1.name} won horizontal`);
    } else if (
      board[1][0] === player2.marker &&
      board[1][1] === player2.marker &&
      board[1][2] === player2.marker
    ) {
      console.log(`${player2.name} won horizontal`);
    } else if (
      board[2][0] === player1.marker &&
      board[2][1] === player1.marker &&
      board[2][2] === player1.marker
    ) {
      console.log(`${player1.name} won horizontal`);
    } else if (
      board[2][0] === player2.marker &&
      board[2][1] === player2.marker &&
      board[2][2] === player2.marker
    ) {
      console.log(`${player2.name} won horizontal`);
    } else if (
      board[0][0] === player1.marker &&
      board[1][0] === player1.marker &&
      board[2][0] === player1.marker
    ) {
      console.log(`${player1.name} won vertical`);
    } else if (
      board[0][0] === player2.marker &&
      board[1][0] === player2.marker &&
      board[2][0] === player2.marker
    ) {
      console.log(`${player2.name} won vertical`);
    } else if (
      board[0][1] === player1.marker &&
      board[1][1] === player1.marker &&
      board[2][1] === player1.marker
    ) {
      console.log(`${player1.name} won vertical`);
    } else if (
      board[0][1] === player2.marker &&
      board[1][1] === player2.marker &&
      board[2][1] === player2.marker
    ) {
      console.log(`${player2.name} won vertical`);
    } else if (
      board[0][2] === player1.marker &&
      board[1][2] === player1.marker &&
      board[2][2] === player1.marker
    ) {
      console.log(`${player1.name} won vertical`);
    } else if (
      board[0][2] === player2.marker &&
      board[1][2] === player2.marker &&
      board[2][2] === player2.marker
    ) {
      console.log(`${player2.name} won vertical`);
    } else if (
      board[0][0] === player1.marker &&
      board[1][1] === player1.marker &&
      board[2][2] === player1.marker
    ) {
      console.log(`${player1.name}won diagonal`);
    } else if (
      board[0][0] === player2.marker &&
      board[1][1] === player2.marker &&
      board[2][2] === player2.marker
    ) {
      console.log(`${player2.name}won diagonal`);
    } else if (
      board[0][2] === player1.marker &&
      board[1][1] === player1.marker &&
      board[2][0] === player1.marker
    ) {
      console.log(`${player1.name}won diagonal`);
    } else if (
      board[0][2] === player2.marker &&
      board[1][1] === player2.marker &&
      board[2][0] === player2.marker
    ) {
      console.log(`${player2.name}won diagonal`);
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

  function switchPlayerTurn() {
    if (currentPlayer === player1) {
      return player2;
    }
    return player1;
  }
  return {
    checkWin,
    switchPlayerTurn,
    checkDraw,
    checkValidMove,
  };
})();
gameBoard.makeMove(currentPlayer, 1, 1);
gameBoard.makeMove(currentPlayer, 1, 1);
gameBoard.makeMove(currentPlayer, 2, 1);
console.log(gameBoard.getBoard());
