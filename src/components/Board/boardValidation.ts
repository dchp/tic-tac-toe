import BoardSize from "./types/BoardSize";
import {
  BoardTerritory,
  getOccupiedSquaresCount,
} from "./types/BoardTerritory";
import ValidationOutput from "./types/ValidationOutput";
import ValidationStatusEnum from "./types/ValidationStatusEnum";

const MinLineLength = 3;
const MinBoardSize = 3;
const MaxBoardSize = 10;

const validate = (
  playerXTerritory: BoardTerritory,
  playerOTerritory: BoardTerritory,
  lineLengthToWin: number,
  boardSize: BoardSize
): ValidationOutput => {
  const { width, height } = boardSize;

  if (
    width < MinBoardSize ||
    width > MaxBoardSize ||
    height < MinBoardSize ||
    height > MaxBoardSize
  ) {
    return {
      status: ValidationStatusEnum.Error,
      error: `Board size must be at least ${MinBoardSize} and not bigger than ${MaxBoardSize}`,
    };
  }

  if (
    lineLengthToWin < MinLineLength ||
    lineLengthToWin > Math.min(height, width)
  ) {
    return {
      status: ValidationStatusEnum.Error,
      error: `Line length must be at least ${MinLineLength} and not bigger than board size`,
    };
  }

  return validateTerritory(
    playerXTerritory,
    playerOTerritory,
    lineLengthToWin,
    width,
    height
  );
};

const validateTerritory = (
  playerXTerritory: BoardTerritory,
  playerOTerritory: BoardTerritory,
  _lineLengthToWin: number,
  boardWidth: number,
  boardHeight: number
): ValidationOutput => {
  if (playerXTerritory & playerOTerritory) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Players cannot occupy the same square",
    };
  }

  if (
    playerXTerritory.toString(2).length > boardWidth * boardHeight ||
    playerOTerritory.toString(2).length > boardWidth * boardHeight
  ) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Territory is bigger than board",
    };
  }

  const playerXSquaresCount = getOccupiedSquaresCount(playerXTerritory);
  const playerOSquaresCount = getOccupiedSquaresCount(playerOTerritory);

  if (playerXSquaresCount === 0 && playerOSquaresCount === 1) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Player one must start the game",
    };
  }

  if (
    playerXSquaresCount - 1 > playerOSquaresCount ||
    playerXSquaresCount < playerOSquaresCount
  ) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Players take turns making moves",
    };
  }

  if (playerXSquaresCount + playerOSquaresCount === boardWidth * boardHeight) {
    return { status: ValidationStatusEnum.Tie };
  }

  return { status: ValidationStatusEnum.Play };
};

export default validate;
