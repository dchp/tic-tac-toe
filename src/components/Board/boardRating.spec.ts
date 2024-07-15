import {
  getLongestDiagonalFromLeftToRightLineToWin,
  getLongestHorizontalLineToWin,
  getLongestLineToWin,
  getLongestVerticalLineToWin,
} from "./boardRating";
import Board from "./types/Board";
import PlayerEnum from "./types/PlayerEnum";

describe("boardRating", () => {
  const player = PlayerEnum.PlayerX;

  describe("getLongestLineToWin", () => {
    const boardLineSize = { width: 10, height: 1 };

    it("should return 0 if no line exists", () => {
      const board: Board = {
        size: boardLineSize,
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      expect(getLongestLineToWin(player, board, 3)).toBe(0);
    });

    it("should return line when could be win line in future", () => {
      const board: Board = {
        size: boardLineSize,
        playerXTerritory: 0b0111000000n,
        playerOTerritory: 0n,
      };

      expect(getLongestLineToWin(player, board, 4)).toBe(3);
    });

    it("should return 0 when line could not be winner line", () => {
      const board: Board = {
        size: boardLineSize,
        playerXTerritory: 0b0111000000n,
        playerOTerritory: 0b1000100000n,
      };

      expect(getLongestLineToWin(player, board, 4)).toBe(0);
    });

    it("should return line when is winner", () => {
      const board: Board = {
        size: boardLineSize,
        playerXTerritory: 0b1111000000n,
        playerOTerritory: 0b0000100000n,
      };

      expect(getLongestLineToWin(player, board, 4)).toBe(4);
    });

    it("should return longest line from more lines", () => {
      const board: Board = {
        size: boardLineSize,
        playerXTerritory: 0b1101111010n,
        playerOTerritory: 0n,
      };

      expect(getLongestLineToWin(player, board, 3)).toBe(4);
    });
  });

  describe("getLongestHorizontalLineToWin", () => {
    const boardSize = { width: 4, height: 4 };

    it("should return 0 if no horizontal line exists", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      expect(getLongestHorizontalLineToWin(player, board, 3)).toBe(0);
    });

    it("should return horizontal line when could be win line in future", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0000_0111_0000_0000n,
        playerOTerritory: 0n,
      };

      expect(getLongestHorizontalLineToWin(player, board, 4)).toBe(3);
    });

    it("should return 0 when horizontal line could not be winner line", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0000_1110_0000n,
        playerOTerritory: 0b1111_0001_0000n,
      };

      expect(getLongestHorizontalLineToWin(player, board, 4)).toBe(0);
    });

    it("should return horizontal line when is winner", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b1111_0000_0000n,
        playerOTerritory: 0n,
      };

      expect(getLongestHorizontalLineToWin(player, board, 4)).toBe(4);
    });

    it("should return longest horizontal line from more lines", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0110_1111_0100_0001n,
        playerOTerritory: 0n,
      };

      expect(getLongestHorizontalLineToWin(player, board, 3)).toBe(4);
    });
  });

  describe("getLongestVerticalLineToWin", () => {
    const boardSize = { width: 4, height: 4 };

    it("should return 0 if no vertical line exists", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      expect(getLongestVerticalLineToWin(player, board, 3)).toBe(0);
    });

    it("should return vertical line from column when could be win line in future", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0000_0111_0100_0000n,
        playerOTerritory: 0n,
      };

      expect(getLongestVerticalLineToWin(player, board, 4)).toBe(2);
    });

    it("should return 0 when no vertical line in column could not be winner line", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b1111_1000_1100_0000n,
        playerOTerritory: 0b1111n,
      };

      expect(getLongestVerticalLineToWin(player, board, 4)).toBe(0);
    });

    it("should return vertical line from column when is winner", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b1000_1000_1000_1000n,
        playerOTerritory: 0n,
      };

      expect(getLongestVerticalLineToWin(player, board, 4)).toBe(4);
    });

    it("should return longest vertical line from more lines", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b1111_1110_1100_0100n,
        playerOTerritory: 0n,
      };

      expect(getLongestVerticalLineToWin(player, board, 3)).toBe(4);
    });
  });

  describe("getLongestDiagonalFromLeftToRightLineToWin", () => {
    const boardSize = { width: 4, height: 3 };

    it("should return 0 if no diagonal line (from left to right) exists", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      expect(getLongestDiagonalFromLeftToRightLineToWin(player, board, 3)).toBe(
        0
      );
    });

    it("should return line from diagonal (from left to right) when could be win line in future", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0011_0010_0000n,
        playerOTerritory: 0n,
      };

      expect(getLongestDiagonalFromLeftToRightLineToWin(player, board, 3)).toBe(
        2
      );
    });

    it("should return 0 when no diagonal (from left to right) could not be winner line", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0011_0010_0000n,
        playerOTerritory: 0b1111n,
      };

      expect(getLongestDiagonalFromLeftToRightLineToWin(player, board, 3)).toBe(
        0
      );
    });

    it("should return line from diagonal (from left to right) when is winner", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0011_0010_0100n,
        playerOTerritory: 0n,
      };

      expect(getLongestDiagonalFromLeftToRightLineToWin(player, board, 3)).toBe(
        3
      );
    });

    it("should return longest diagonal line (from left to right) from more lines", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b0110_0100_1000n,
        playerOTerritory: 0n,
      };

      expect(getLongestDiagonalFromLeftToRightLineToWin(player, board, 3)).toBe(
        3
      );
    });
  });
});
