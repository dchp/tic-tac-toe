import Board from "./Board";
import BoardSize from "./BoardSize";

// Binary number where each bit represents filled board square
export type BoardTerritory = bigint;

export const getFilledSquaresCount = (territory: BoardTerritory): number => {
  let count = 0;

  while (territory) {
    // removes the lowest set bit
    territory &= territory - 1n;
    count++;
  }

  return count;
};

export const extractRow = (board: Board, rowIndex: bigint): Board => {
  const { width, height } = board.size;
  const shiftAmount = (height - rowIndex - 1n) * width;
  const mask = (1n << width) - 1n;
  const playerXTerritory = (board.playerXTerritory >> shiftAmount) & mask;
  const playerOTerritory = (board.playerOTerritory >> shiftAmount) & mask;

  return {
    size: { width: board.size.width, height: 1n },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export const extractColumn = (board: Board, columnIndex: bigint): Board => {
  const { width, height } = board.size;
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;
  let mask = 0n;

  for (let row = 0n; row < height; row++) {
    mask = 1n << (width * (height - row - 1n) + (width - columnIndex - 1n));
    playerXTerritory |= (board.playerXTerritory & mask) > 0n ? 1n << row : 0n;
    playerOTerritory |= (board.playerOTerritory & mask) > 0n ? 1n << row : 0n;
  }
  return {
    size: { width: board.size.height, height: 1n },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

const calculateDiagonalLength = (
  diagonalIndex: bigint,
  boardSize: BoardSize
): bigint => {
  const { width, height } = boardSize;
  const diagonalCount = width + height - 1n;

  let diagonalLength =
    diagonalIndex < height ? diagonalIndex + 1n : diagonalCount - diagonalIndex;
  if (width < diagonalLength) {
    diagonalLength = width;
  }

  return diagonalLength;
};

export const extractDiagonalFromLeftToRight = (
  board: Board,
  diagonalIndex: bigint
): Board => {
  const { height } = board.size;
  const diagonalLength = calculateDiagonalLength(diagonalIndex, board.size);
  let rowIndex = diagonalIndex < height ? diagonalIndex : height - 1n;
  let columnIndex = diagonalIndex < height ? 0n : diagonalIndex - height + 1n;
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;

  for (let valueIndex = 0n; valueIndex < diagonalLength; valueIndex++) {
    // TODO: refactor this - don't need call other functions
    const row = extractRow(board, rowIndex);
    const indexValue = extractColumn(row, columnIndex);
    playerXTerritory =
      (playerXTerritory << 1n) | (indexValue.playerXTerritory & 1n);
    playerOTerritory =
      (playerOTerritory << 1n) | (indexValue.playerOTerritory & 1n);

    rowIndex--;
    columnIndex++;
  }

  return {
    size: { width: diagonalLength, height: 1n },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export const extractDiagonalFromRightToLeft = (
  board: Board,
  diagonalIndex: bigint
): Board => {
  const { height, width } = board.size;
  const diagonalLength = calculateDiagonalLength(diagonalIndex, board.size);
  let rowIndex = diagonalIndex < height ? diagonalIndex : height - 1n;
  let columnIndex =
    diagonalIndex < height
      ? width - 1n
      : width - 1n - (diagonalIndex - height + 1n);
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;

  for (let valueIndex = 0n; valueIndex < diagonalLength; valueIndex++) {
    // TODO: refactor this - don't need call other functions
    const row = extractRow(board, rowIndex);
    const indexValue = extractColumn(row, columnIndex);
    playerXTerritory =
      (playerXTerritory << 1n) | (indexValue.playerXTerritory & 1n);
    playerOTerritory =
      (playerOTerritory << 1n) | (indexValue.playerOTerritory & 1n);

    rowIndex--;
    columnIndex--;
  }

  return {
    size: { width: diagonalLength, height: 1n },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export default BoardTerritory;
