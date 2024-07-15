import getRatingFor from "./boardRating";
import Board, { getSquareCount, possibleMoves } from "./types/Board";
import BoardRating, { negateRating } from "./types/BoardRating";
import { getFilledSquaresCount } from "./types/BoardTerritory";
import PlayerEnum, { getOponent } from "./types/PlayerEnum";

const bestRatingMemo = new Map<string, BoardRating>();
let ratingCounter = 0;

export const computeBestMoveAsync = async (
  board: Board,
  playerOnMove: PlayerEnum,
  lineLength: number
): Promise<Board> => {
  const maxDepth = getDepth(board);
  let bestMoves: Board[] = [];
  let bestRating = -Infinity;

  for (const newBoard of possibleMoves(board, playerOnMove)) {
    let rating = await negamaxAsync(
      playerOnMove,
      newBoard,
      0,
      maxDepth,
      lineLength
    );

    if (rating.value === bestRating) {
      bestMoves.push(newBoard);
    }

    if (rating.value > bestRating) {
      bestRating = rating.value;
      bestMoves = [newBoard];
    }

    if (rating.isWinner && maxDepth === 0) {
      break;
    }
  }
  bestRatingMemo.clear();

  if (bestMoves.length === 0) {
    console.error("No moves found");
  }

  if (bestMoves.length > 1) {
    console.debug(`Random move from ${bestMoves.length} moves`);
    const randomMoveIndex = Math.floor(Math.random() * bestMoves.length);

    return bestMoves[randomMoveIndex];
  }

  return bestMoves[0];
};

const getDepth = (board: Board): number => {
  const symbolCount = getFilledSquaresCount(
    board.playerXTerritory | board.playerOTerritory
  );

  let depth = 0;

  if (getSquareCount(board) - symbolCount <= 20) {
    depth = 3;
  } else if (getSquareCount(board) - symbolCount <= 40) {
    depth = 2;
  } else if (getSquareCount(board) - symbolCount <= 60) {
    depth = 1;
  }

  console.debug(`depth ${depth}`);

  return depth;
};

const negamaxAsync = async (
  player: PlayerEnum,
  board: Board,
  depth: number,
  maxDepth: number,
  lineLength: number
): Promise<BoardRating> => {
  const rating = getRatingFor(player, board, lineLength);

  if (ratingCounter++ % 300 === 0) {
    await allowEventLoopToProcessOtherTasksAsync();
    ratingCounter = 0;
  }

  if (depth === maxDepth || rating.isWinner || rating.isLooser) {
    if (rating.isWinner) {
      rating.value -= depth;
    }

    if (rating.isLooser) {
      rating.value += depth;
    }

    return rating;
  }

  const oponentPlayer = getOponent(player);
  let maxEval = {
    value: -Infinity,
    isWinner: false,
    isLooser: false,
  } as BoardRating;

  for (const newBoard of possibleMoves(board, oponentPlayer)) {
    let evalValue = await negamaxAsyncMemo(
      oponentPlayer,
      newBoard,
      depth + 1,
      maxDepth,
      lineLength
    );
    evalValue = negateRating(evalValue);
    if (evalValue.isWinner) {
      return evalValue;
    }

    maxEval = maxEval.value > evalValue.value ? maxEval : evalValue;
  }

  return maxEval;
};

const negamaxAsyncMemo = async (
  player: PlayerEnum,
  board: Board,
  depth: number,
  maxDepth: number,
  lineLength: number
): Promise<BoardRating> => {
  if (maxDepth < 2) {
    return await negamaxAsync(player, board, depth, maxDepth, lineLength);
  }

  const boardKey = `${board.playerXTerritory}-${board.playerOTerritory}-${player}-${depth}`;
  if (bestRatingMemo.has(boardKey)) {
    return bestRatingMemo.get(boardKey)!;
  }

  const result = await negamaxAsync(player, board, depth, maxDepth, lineLength);
  bestRatingMemo.set(boardKey, result);
  return result;
};

const allowEventLoopToProcessOtherTasksAsync = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 0));
};
