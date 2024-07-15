import Board, { getTerritoryFor, isSquareEmpty } from "./types/Board";
import BoardRating from "./types/BoardRating";
import {
  extractColumn,
  extractDiagonalFromLeftToRight,
  extractDiagonalFromRightToLeft,
  extractRow,
} from "./types/BoardTerritory";
import PlayerEnum from "./types/PlayerEnum";

const oneSquareRating = 1000;
const winRating = 1000000;

export const getRatingFor = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): BoardRating => {
  const playerXLine = computeLongestLineFor(
    PlayerEnum.PlayerX,
    board,
    lineLength
  );

  const playerOLine = computeLongestLineFor(
    PlayerEnum.PlayerO,
    board,
    lineLength
  );

  const isWinning =
    player === PlayerEnum.PlayerX
      ? playerXLine >= lineLength
      : playerOLine >= lineLength;
  const isLooser =
    player === PlayerEnum.PlayerX
      ? playerOLine >= lineLength
      : playerXLine >= lineLength;

  const playerXRating = (playerXLine - playerOLine) * oneSquareRating;

  return {
    value: isWinning
      ? winRating
      : isLooser
      ? -winRating
      : playerXRating * (player === PlayerEnum.PlayerX ? 1 : -1),
    isWinner: isWinning,
    isLooser: isLooser,
  };
};

const computeLongestLineFor = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  return Math.max(
    getLongestHorizontalLineToWin(player, board, lineLength),
    getLongestVerticalLineToWin(player, board, lineLength),
    getLongestDiagonalFromLeftToRightLineToWin(player, board, lineLength),
    getLongestDiagonalFromRightToLeftLineToWin(player, board, lineLength)
  );
};

export const getLongestHorizontalLineToWin = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  const { height } = board.size;
  let longestLineToWin = 0;

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row = extractRow(board, rowIndex);
    const currentLineLength = getLongestLineToWin(player, row, lineLength);

    if (currentLineLength > longestLineToWin) {
      longestLineToWin = currentLineLength;
    }
  }

  return longestLineToWin;
};

export const getLongestVerticalLineToWin = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  const { width } = board.size;
  let longestLineToWin = 0;

  for (let columnIndex = 0; columnIndex < width; columnIndex++) {
    const column = extractColumn(board, columnIndex);
    const currentLineLength = getLongestLineToWin(player, column, lineLength);

    if (currentLineLength > longestLineToWin) {
      longestLineToWin = currentLineLength;
    }
  }

  return longestLineToWin;
};

export const getLongestDiagonalFromLeftToRightLineToWin = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  const { width, height } = board.size;
  const diagonalCount = width + height - 1;
  let longestLineToWin = 0;

  for (let diagonalIndex = 0; diagonalIndex < diagonalCount; diagonalIndex++) {
    const diagonal = extractDiagonalFromLeftToRight(board, diagonalIndex);
    const currentLineLength = getLongestLineToWin(player, diagonal, lineLength);

    if (currentLineLength > longestLineToWin) {
      longestLineToWin = currentLineLength;
    }
  }

  return longestLineToWin;
};

export const getLongestDiagonalFromRightToLeftLineToWin = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  const { width, height } = board.size;
  const diagonalCount = width + height - 1;
  let longestLineToWin = 0;

  for (let diagonalIndex = 0; diagonalIndex < diagonalCount; diagonalIndex++) {
    const diagonal = extractDiagonalFromRightToLeft(board, diagonalIndex);
    const currentLineLength = getLongestLineToWin(player, diagonal, lineLength);

    if (currentLineLength > longestLineToWin) {
      longestLineToWin = currentLineLength;
    }
  }

  return longestLineToWin;
};

export const getLongestLineToWin = (
  player: PlayerEnum,
  board: Board,
  lineLength: number
): number => {
  const playerTerritory = getTerritoryFor(player, board);
  let longestLineToWin = 0;
  let currentLineLength = 0;
  let currentUsableSquares = 0;

  for (let squareIndex = 0n; squareIndex < board.size.width; squareIndex++) {
    const isEmpty = isSquareEmpty(board, squareIndex);

    if (playerTerritory & (1n << squareIndex)) {
      currentLineLength += 1;
    } else {
      if (isEmpty) {
        currentUsableSquares += currentLineLength;
      }

      if (
        currentLineLength + currentUsableSquares >= lineLength &&
        currentLineLength > longestLineToWin
      ) {
        longestLineToWin = currentLineLength;
      }

      if (!isEmpty) {
        currentUsableSquares = 0;
      }
      currentLineLength = 0;
    }
  }

  return longestLineToWin > currentLineLength
    ? longestLineToWin
    : currentLineLength + currentUsableSquares >= lineLength
    ? currentLineLength
    : 0;
};

export default getRatingFor;
