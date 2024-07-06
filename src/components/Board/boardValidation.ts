import getRating from "./boardRating";
import Board from "./types/Board";
import { getFilledSquaresCount } from "./types/BoardTerritory";
import PlayerEnum from "./types/PlayerEnum";
import ValidationOutput from "./types/ValidationOutput";
import ValidationStatusEnum from "./types/ValidationStatusEnum";

const MinLineLength = 3;
const MinBoardSize = 3;
const MaxBoardSize = 10;

const validate = (board: Board, lineLength: number): ValidationOutput => {
  return (
    validateInputParams(board, lineLength) ||
    validateGameRules(board) ||
    validateGameState(board, lineLength)
  );
};

const validateInputParams = (
  board: Board,
  lineLength: number
): ValidationOutput | undefined => {
  const { width, height } = board.size;

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

  if (lineLength < MinLineLength || lineLength > height || lineLength > width) {
    return {
      status: ValidationStatusEnum.Error,
      error: `Line length must be at least ${MinLineLength} and not bigger than board size`,
    };
  }

  if (
    board.playerXTerritory.toString(2).length > width * height ||
    board.playerOTerritory.toString(2).length > width * height
  ) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Territory is bigger than board",
    };
  }

  return undefined;
};

const validateGameRules = (board: Board): ValidationOutput | undefined => {
  const { width, height } = board.size;

  if (board.playerXTerritory & board.playerOTerritory) {
    return {
      status: ValidationStatusEnum.Error,
      error: "Players cannot occupy the same square",
    };
  }

  const playerXSquaresCount = getFilledSquaresCount(board.playerXTerritory);
  const playerOSquaresCount = getFilledSquaresCount(board.playerOTerritory);

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

  if (BigInt(playerXSquaresCount + playerOSquaresCount) === width * height) {
    return { status: ValidationStatusEnum.Tie };
  }

  return undefined;
};

function validateGameState(board: Board, lineLength: number): ValidationOutput {
  const playerXRating = getRating(PlayerEnum.PlayerX, board, lineLength);
  const playerORating = getRating(PlayerEnum.PlayerO, board, lineLength);

  if (playerXRating.isWinning) {
    if (
      getFilledSquaresCount(board.playerOTerritory) >=
      getFilledSquaresCount(board.playerXTerritory)
    ) {
      return {
        status: ValidationStatusEnum.Error,
        error: "Player two played after game was already won",
      };
    }

    return { status: ValidationStatusEnum.Win };
  }

  if (playerORating.isWinning) {
    return { status: ValidationStatusEnum.Win };
  }

  return { status: ValidationStatusEnum.Play };
}

export default validate;
