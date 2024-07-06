import validate from "../boardValidation";
import Board from "./Board";
import BoardArray, { getBoard } from "./BoardArray";
import ValidationOutput from "./ValidationOutput";
import ValidationStatusEnum from "./ValidationStatusEnum";

describe("BoardArray", () => {
  describe("getBoard", () => {
    // TODO: Remove thist test case (it is only for demonstration how call validate with BoardArray)
    it("should prepare right data for validate function", () => {
      const board: BoardArray = [
        ["X", "X", "X"],
        ["", "", ""],
        ["O", "O", "O"],
      ];
      const expected: ValidationOutput = {
        status: ValidationStatusEnum.Error,
        error: "Player two played after game was already won",
      };

      const result = validate(getBoard(board), 3);

      expect(result).toEqual(expected);
    });

    it("should return 0 for empty board or when no territory", () => {
      const board: BoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      const expectedBoard: Board = {
        size: { width: 3n, height: 3n },
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      };

      const result = getBoard(board);

      expect(result).toEqual(expectedBoard);
    });

    it("should return correct binary representation", () => {
      const board: BoardArray = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", ""],
      ];
      const expectedBoard: Board = {
        size: { width: 3n, height: 3n },
        playerXTerritory: 0b101_010_100n,
        playerOTerritory: 0b010_101_010n,
      };

      const result = getBoard(board);

      expect(result).toEqual(expectedBoard);
    });
  });
});
