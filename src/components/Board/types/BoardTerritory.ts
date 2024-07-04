import BoardArray from "./BoardArray";

// Binary number where each bit represents occupied board square
export type BoardTerritory = number;

export function getBoardTerritory(
  board: BoardArray,
  territorySymbol: string
): BoardTerritory {
  let binaryRepresentation = 0;
  let bitPosition = 0;

  for (let row = board.length - 1; row >= 0; row--) {
    for (let col = board[row].length - 1; col >= 0; col--) {
      if (board[row][col] === territorySymbol) {
        binaryRepresentation |= 1 << bitPosition;
      }
      bitPosition++;
    }
  }

  return binaryRepresentation;
}

export const getOccupiedSquaresCount = (territory: BoardTerritory): number => {
  let count = 0;

  while (territory) {
    // removes the lowest set bit
    territory &= territory - 1;
    count++;
  }

  return count;
};
