import validate from "./boardValidation";
import ValidationStatusEnum from "./types/ValidationStatusEnum";

describe("boardValidation", () => {
  describe("validate", () => {
    const lineLength = 3;
    const boardSize = { width: 3, height: 3 };

    it("should return error when first move is not made by player X", () => {
      const playerXTerritory = 0;
      const playerOTerritory = 0b100_000_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Player one must start the game",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when player move twice in a row", () => {
      const playerXTerritory = 0b101_010_000;
      const playerOTerritory = 0b010_000_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Players take turns making moves",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return play when game can continue", () => {
      const playerXTerritory = 0b101_000_101;
      const playerOTerritory = 0b010_101_010;
      const expectedOutput = {
        status: ValidationStatusEnum.Play,
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return win when player X win", () => {
      const playerXTerritory = 0b111_000_000;
      const playerOTerritory = 0b000_000_110;
      const expectedOutput = {
        status: ValidationStatusEnum.Win,
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when player O move after win player X", () => {
      const playerXTerritory = 0b111_000_000;
      const playerOTerritory = 0b000_000_111;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Player two played after game was already won",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return tie when all squares are filled", () => {
      const playerXTerritory = 0b110_001_101;
      const playerOTerritory = 0b001_110_010;
      const expectedOutput = {
        status: ValidationStatusEnum.Tie,
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when players occupy the same square", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b100_000_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Players cannot occupy the same square",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when teritory is bigger than board", () => {
      const playerXTerritory = 0b100_000_000_0;
      const playerOTerritory = 0b100_000_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Territory is bigger than board",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        lineLength,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is smaller than 3", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b000_100_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(playerXTerritory, playerOTerritory, 2, boardSize);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is bigger than board width", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b000_100_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        boardSize.width + 1,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is bigger than board height", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b000_100_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(
        playerXTerritory,
        playerOTerritory,
        boardSize.height + 1,
        boardSize
      );

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board width is smaller than 3", () => {
      const playerXTerritory = 0b100_000;
      const playerOTerritory = 0b000_100;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(playerXTerritory, playerOTerritory, lineLength, {
        width: 2,
        height: 3,
      });

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board height is smaller than 3", () => {
      const playerXTerritory = 0b100_000;
      const playerOTerritory = 0b000_100;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(playerXTerritory, playerOTerritory, lineLength, {
        width: 3,
        height: 2,
      });

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board width is bigger than 10", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b000_100_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(playerXTerritory, playerOTerritory, lineLength, {
        width: 11,
        height: 3,
      });

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board height is bigger than 10", () => {
      const playerXTerritory = 0b100_000_000;
      const playerOTerritory = 0b000_100_000;
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(playerXTerritory, playerOTerritory, lineLength, {
        width: 3,
        height: 11,
      });

      expect(result).toEqual(expectedOutput);
    });
  });
});
