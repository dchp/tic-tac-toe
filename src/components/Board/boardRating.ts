import BoardRating from "./types/BoardRating";
import BoardSize from "./types/BoardSize";
import { BoardTerritory } from "./types/BoardTerritory";

const oneSquareRating = 1000;

// TODO: implement rating function
const rating = (
  playerXTerritory: BoardTerritory,
  playerOTerritory: BoardTerritory,
  lineLengthToWin: number,
  boardSize: BoardSize
): BoardRating => {
  return { value: 0 * oneSquareRating, isWinning: true };
};

export const getLongestHorizontalLineToWin = (
  playerRowTerritory: BoardTerritory,
  blockedRowTerritory: BoardTerritory,
  lineLengthToWin: number,
  boardSize: BoardSize
): number => {
  const { width, height } = boardSize;
  let longestLineToWin = 0;

  for (let row = 0n; row < height; row++) {
    const playerOnTurnBits =
      (playerRowTerritory >> (row * width)) & ((1n << width) - 1n);
    const blockedBits =
      (blockedRowTerritory >> (row * width)) & ((1n << width) - 1n);

    let currentLineLength = getLongestLineToWin(
      playerOnTurnBits,
      blockedBits,
      lineLengthToWin,
      width
    );

    if (currentLineLength > longestLineToWin) {
      longestLineToWin = currentLineLength;
    }
  }

  return longestLineToWin;
};

export const getLongestLineToWin = (
  playerLineTerritory: BoardTerritory,
  blockedLineTerritory: BoardTerritory,
  lineLengthWinMin: number,
  lineTeritoryLength: bigint
): number => {
  let longestLineToWin = 0;
  let currentLineLength = 0;
  let currentUsableSquares = 0;

  for (let squareIndex = 0n; squareIndex < lineTeritoryLength; squareIndex++) {
    const isLineBlocked = blockedLineTerritory & (1n << squareIndex);

    if (playerLineTerritory & (1n << squareIndex)) {
      currentLineLength += 1;
    } else {
      if (!isLineBlocked) {
        currentUsableSquares += currentLineLength;
      }

      if (
        currentLineLength + currentUsableSquares >= lineLengthWinMin &&
        currentLineLength > longestLineToWin
      ) {
        longestLineToWin = currentLineLength;
      }

      if (isLineBlocked) {
        currentUsableSquares = 0;
      }
      currentLineLength = 0;
    }
  }

  return longestLineToWin > currentLineLength
    ? longestLineToWin
    : currentLineLength + currentUsableSquares >= lineLengthWinMin
    ? currentLineLength
    : 0;
};

export default rating;
