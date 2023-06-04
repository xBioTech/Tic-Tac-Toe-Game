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
    board[row][col] = player.marker;
    gameController.checkWin(board);
  }

  createGameBoard();

  return {
    board,
    getBoard,
    makeMove,
  };
})();

const player = (name, marker) => ({ name, marker });

const john = player("john", "X");

const gameController = (() => {
  function checkWin(board) {
    if (
      (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") ||
      (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O")
    ) {
      // return "You Won";
      console.log("you won horizontal");
    } else if (
      (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") ||
      (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O")
    ) {
      console.log("you won horizontal");
    } else if (
      (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") ||
      (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O")
    ) {
      console.log("you won horizontal");
    } else if (
      (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
      (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O")
    ) {
      console.log("you won vertical");
    } else if (
      (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
      (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O")
    ) {
      console.log("you won vertical");
    } else if (
      (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
      (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O")
    ) {
      console.log("you won vertical");
    } else if (
      (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
      (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O")
    ) {
      console.log("you won diagonal");
    } else if (
      (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") ||
      (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
    ) {
      console.log("you won diagonal");
    }
  }
  return {
    checkWin,
  };
})();
gameBoard.makeMove(john, [0], [2]);
gameBoard.makeMove(john, [1], [1]);
gameBoard.makeMove(john, [2], [0]);
console.log(gameBoard.getBoard());
