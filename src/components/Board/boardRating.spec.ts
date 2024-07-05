import {
  getLongestHorizontalLineToWin,
  getLongestLineToWin,
} from "./boardRating";

describe("boardRating", () => {
  describe("getLongestLineToWin", () => {
    it("should return 0 if no line exists", () => {
      expect(getLongestLineToWin(0n, 0n, 3, 10n)).toBe(0);
    });

    it("should return line when could be win line in future", () => {
      expect(getLongestLineToWin(0b0111000000n, 0n, 4, 10n)).toBe(3);
    });

    it("should return 0 when line could not be winner line", () => {
      expect(getLongestLineToWin(0b0111000000n, 0b1000100000n, 4, 10n)).toBe(0);
    });

    it("should return line when is winner", () => {
      expect(getLongestLineToWin(0b1111000000n, 0b0000100000n, 4, 10n)).toBe(4);
    });

    it("should return longest line from more lines", () => {
      expect(getLongestLineToWin(0b1101111010n, 0n, 3, 10n)).toBe(4);
    });
  });

  describe("getLongestHorizontalLineToWin", () => {
    const boardSize = { width: 4n, height: 4n };

    it("should return 0 if no line exists", () => {
      expect(getLongestHorizontalLineToWin(0n, 0n, 3, boardSize)).toBe(0);
    });

    it("should return line when could be win line in future", () => {
      expect(
        getLongestHorizontalLineToWin(0b0000_0111_0000_0000n, 0n, 4, boardSize)
      ).toBe(3);
    });

    it("should return 0 when line could not be winner line", () => {
      expect(
        getLongestHorizontalLineToWin(
          0b0000_1110_0000n,
          0b1111_0001_0000n,
          4,
          boardSize
        )
      ).toBe(0);
    });

    it("should return line when is winner", () => {
      expect(
        getLongestHorizontalLineToWin(0b1111_0000_0000n, 0n, 4, boardSize)
      ).toBe(4);
    });

    it("should return longest line from more lines", () => {
      expect(
        getLongestHorizontalLineToWin(0b0110_1111_0100_0001n, 0n, 3, boardSize)
      ).toBe(4);
    });
  });
});
