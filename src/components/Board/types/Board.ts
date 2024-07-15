import BoardSize from "./BoardSize";
import BoardTerritory from "./BoardTerritory";
import PlayerEnum from "./PlayerEnum";

type Board = {
  size: BoardSize;
  playerXTerritory: BoardTerritory;
  playerOTerritory: BoardTerritory;
};

export const getTerritoryFor = (
  player: PlayerEnum,
  board: Board
): BoardTerritory => {
  return player === PlayerEnum.PlayerX
    ? board.playerXTerritory
    : board.playerOTerritory;
};

export const isSquareEmpty = (board: Board, squareIndex: bigint): boolean => {
  return (
    ((board.playerXTerritory | board.playerOTerritory) &
      (1n << squareIndex)) ===
    0n
  );
};

export function getSquareCount(board: Board): number {
  return board.size.width * board.size.height;
}

export function* squareIndexes(board: Board): Generator<bigint> {
  for (
    let squareIndex = 0n;
    squareIndex < getSquareCount(board);
    squareIndex++
  ) {
    yield squareIndex;
  }
}

export function* possibleMoves(
  board: Board,
  player: PlayerEnum
): Generator<Board> {
  for (const squareIndex of squareIndexes(board)) {
    if (isSquareEmpty(board, squareIndex)) {
      const newTeritory = getTerritoryFor(player, board) | (1n << squareIndex);
      const newBoard = { ...board };

      if (player === PlayerEnum.PlayerO) {
        newBoard.playerOTerritory = newTeritory;
      } else {
        newBoard.playerXTerritory = newTeritory;
      }

      yield newBoard;
    }
  }
}

export default Board;
