import {
  extractColumn,
  extractDiagonalFromLeftToRight,
  extractDiagonalFromRightToLeft,
  extractRow,
  getFilledSquaresCount,
} from "./BoardTerritory";
import Board from "./Board";

describe("BoardTerritory", () => {
  describe("extractRow", () => {
    it("should extract the correct row from the board", () => {
      const board: Board = {
        size: { width: 5, height: 4 },
        playerXTerritory: 0b1111_00010_01111_00000n,
        playerOTerritory: 0b0000_11000_00000_00000n,
      };
      const rowIndex = 1;
      const expectedRow: Board = {
        size: { width: 5, height: 1 },
        playerXTerritory: 0b10n,
        playerOTerritory: 0b11000n,
      };

      const result = extractRow(board, rowIndex);

      expect(result).toEqual(expectedRow);
    });
  });

  describe("extractColumn", () => {
    it("should extract the correct column from the board", () => {
      const board: Board = {
        size: { width: 4, height: 5 },
        playerXTerritory: 0b0_1111_0000_1111_0000n,
        playerOTerritory: 0b0_0100_0000_0100n,
      };
      const columnIndex = 2;
      const expectedColumn: Board = {
        size: { width: 5, height: 1 },
        playerXTerritory: 0b01010n,
        playerOTerritory: 0b0n,
      };

      const result = extractColumn(board, columnIndex);

      expect(result).toEqual(expectedColumn);
    });

    it("should extract the correct column from the one row board", () => {
      const board: Board = {
        size: { width: 3, height: 1 },
        playerXTerritory: 0b001n,
        playerOTerritory: 0b100n,
      };
      const columnIndex = 2;
      const expectedColumn: Board = {
        size: { width: 1, height: 1 },
        playerXTerritory: 0b1n,
        playerOTerritory: 0b0n,
      };

      const result = extractColumn(board, columnIndex);

      expect(result).toEqual(expectedColumn);
    });
  });

  describe("extractDiagonalFromLeftToRight", () => {
    it("should extract the first diagonal from the left of the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 0;
      const expectedDiagonal: Board = {
        size: { width: 1, height: 1 },
        playerXTerritory: 0b0n,
        playerOTerritory: 0n,
      };

      const result = extractDiagonalFromLeftToRight(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });

    it("should extract the middle diagonal from the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 2;
      const expectedDiagonal: Board = {
        size: { width: 3, height: 1 },
        playerXTerritory: 0b110n,
        playerOTerritory: 0n,
      };

      const result = extractDiagonalFromLeftToRight(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });

    it("should extract the last diagonal from the left of the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 5;
      const expectedDiagonal: Board = {
        size: { width: 1, height: 1 },
        playerXTerritory: 0b1n,
        playerOTerritory: 0n,
      };

      const result = extractDiagonalFromLeftToRight(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });
  });

  describe("extractDiagonalFromRightToLeft", () => {
    it("should extract the first diagonal from the right of the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 0;
      const expectedDiagonal: Board = {
        size: { width: 1, height: 1 },
        playerXTerritory: 0b0n,
        playerOTerritory: 0b0n,
      };

      const result = extractDiagonalFromRightToLeft(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });

    it("should extract the middle diagonal from the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 2;
      const expectedDiagonal: Board = {
        size: { width: 3, height: 1 },
        playerXTerritory: 0b110n,
        playerOTerritory: 0n,
      };

      const result = extractDiagonalFromRightToLeft(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });

    it("should extract the last diagonal from the right of the board", () => {
      const board: Board = {
        size: { width: 3, height: 4 },
        playerXTerritory: 0b0_111_101_001n,
        playerOTerritory: 0n,
      };
      const diagonalIndex = 5;
      const expectedDiagonal: Board = {
        size: { width: 1, height: 1 },
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      const result = extractDiagonalFromRightToLeft(board, diagonalIndex);

      expect(result).toEqual(expectedDiagonal);
    });
  });

  describe("getFilledSquaresCount", () => {
    it("should return 0 for empty territory", () => {
      const territory = 0n;
      const expectedCount = 0;

      const result = getFilledSquaresCount(territory);

      expect(result).toEqual(expectedCount);
    });

    it("should return correct count of Filled squares", () => {
      const territory = 0b111_001_001n;
      const expectedCount = 5;

      const result = getFilledSquaresCount(territory);

      expect(result).toEqual(expectedCount);
    });
  });
});
