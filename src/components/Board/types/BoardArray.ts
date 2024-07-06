import Board from "./Board";

type BoardArray = string[][];

export function getBoard(board: BoardArray): Board {
  let bitPosition = 0n;
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;

  for (let row = board.length - 1; row >= 0; row--) {
    for (let col = board[row].length - 1; col >= 0; col--) {
      if (board[row][col] === "X") {
        playerXTerritory |= 1n << bitPosition;
      }
      if (board[row][col] === "O") {
        playerOTerritory |= 1n << bitPosition;
      }
      bitPosition++;
    }
  }

  return {
    size: { width: BigInt(board[0].length), height: BigInt(board.length) },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
}

export default BoardArray;
