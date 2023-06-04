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
gameBoard.makeMove(john, [0], [2]);
gameBoard.makeMove(john, [0], [1]);
