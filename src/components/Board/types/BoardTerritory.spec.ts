import { getBoardTerritory, getOccupiedSquaresCount } from "./BoardTerritory";
import BoardArray from "./BoardArray";

describe("BoardTerritory", () => {
  describe("getBoardTerritory", () => {
    it("should return 0 for empty board or when symbol is not present", () => {
      const board: BoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      const territorySymbol = "X";
      const expectedBinaryRepresentation = 0;

      const result = getBoardTerritory(board, territorySymbol);

      expect(result).toEqual(expectedBinaryRepresentation);
    });

    it("should return correct binary representation for given territory symbol", () => {
      const board: BoardArray = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ];
      const territorySymbol = "X";
      const expectedBinaryRepresentation = 0b101_010_101;

      const result = getBoardTerritory(board, territorySymbol);

      expect(result).toEqual(expectedBinaryRepresentation);
    });
  });

  describe("getOccupiedSquaresCount", () => {
    it("should return 0 for empty territory", () => {
      const territory = 0n;
      const expectedCount = 0;

      const result = getOccupiedSquaresCount(territory);

      expect(result).toEqual(expectedCount);
    });

    it("should return correct count of occupied squares", () => {
      const territory = 0b111_001_001n;
      const expectedCount = 5;

      const result = getOccupiedSquaresCount(territory);

      expect(result).toEqual(expectedCount);
    });
  });
});
