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

export const extractRow = (board: Board, rowIndex: number): Board => {
  const { width, height } = board.size;
  const shiftAmount = BigInt((height - rowIndex - 1) * width);
  const mask = (1n << BigInt(width)) - 1n;
  const playerXTerritory = (board.playerXTerritory >> shiftAmount) & mask;
  const playerOTerritory = (board.playerOTerritory >> shiftAmount) & mask;

  return {
    size: { width: board.size.width, height: 1 },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export const extractColumn = (board: Board, columnIndex: number): Board => {
  const { width, height } = board.size;
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;
  let mask = 0n;

  for (let row = 0; row < height; row++) {
    mask = 1n << BigInt(width * (height - row - 1) + (width - columnIndex - 1));
    playerXTerritory |=
      (board.playerXTerritory & mask) > 0n ? 1n << BigInt(row) : 0n;
    playerOTerritory |=
      (board.playerOTerritory & mask) > 0n ? 1n << BigInt(row) : 0n;
  }
  return {
    size: { width: board.size.height, height: 1 },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

const calculateDiagonalLength = (
  diagonalIndex: number,
  boardSize: BoardSize
): number => {
  const { width, height } = boardSize;
  const diagonalCount = width + height - 1;

  let diagonalLength =
    diagonalIndex < height ? diagonalIndex + 1 : diagonalCount - diagonalIndex;
  if (width < diagonalLength) {
    diagonalLength = width;
  }

  return diagonalLength;
};

export const extractDiagonalFromLeftToRight = (
  board: Board,
  diagonalIndex: number
): Board => {
  const { height } = board.size;
  const diagonalLength = calculateDiagonalLength(diagonalIndex, board.size);
  let rowIndex = diagonalIndex < height ? diagonalIndex : height - 1;
  let columnIndex = diagonalIndex < height ? 0 : diagonalIndex - height + 1;
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;

  for (let valueIndex = 0n; valueIndex < diagonalLength; valueIndex++) {
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
    size: { width: diagonalLength, height: 1 },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export const extractDiagonalFromRightToLeft = (
  board: Board,
  diagonalIndex: number
): Board => {
  const { height, width } = board.size;
  const diagonalLength = calculateDiagonalLength(diagonalIndex, board.size);
  let rowIndex = diagonalIndex < height ? diagonalIndex : height - 1;
  let columnIndex =
    diagonalIndex < height
      ? width - 1
      : width - 1 - (diagonalIndex - height + 1);
  let playerXTerritory = 0n;
  let playerOTerritory = 0n;

  for (let valueIndex = 0; valueIndex < diagonalLength; valueIndex++) {
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
    size: { width: diagonalLength, height: 1 },
    playerXTerritory: playerXTerritory,
    playerOTerritory: playerOTerritory,
  };
};

export default BoardTerritory;
