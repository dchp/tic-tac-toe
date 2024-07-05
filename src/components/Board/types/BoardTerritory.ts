// Binary number where each bit represents occupied board square
export type BoardTerritory = bigint;

// TODO: remove this function
export function getBoardTerritory(
  board: BoardArray,
  territorySymbol: string
): BoardTerritory {
  let binaryRepresentation: bigint = 0n;
  let bitPosition: bigint = 0n;

  for (let row = board.length - 1; row >= 0; row--) {
    for (let col = board[row].length - 1; col >= 0; col--) {
      if (board[row][col] === territorySymbol) {
        binaryRepresentation |= 1n << bitPosition;
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
    territory &= territory - 1n;
    count++;
  }

  return count;
};
