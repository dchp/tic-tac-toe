import validate from "./boardValidation";
import Board from "./types/Board";
import ValidationStatusEnum from "./types/ValidationStatusEnum";

describe("boardValidation", () => {
  describe("validate", () => {
    const lineLength = 3;
    const boardSize = { width: 3n, height: 3n };

    it("should return error when first move is not made by player X", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0n,
        playerOTerritory: 0b100_000_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Player one must start the game",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when player move twice in a row", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b101_010_000n,
        playerOTerritory: 0b010_000_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Players take turns making moves",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return play when game can continue", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b101_000_101n,
        playerOTerritory: 0b010_101_010n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Play,
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return win when player X win", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b111_000_000n,
        playerOTerritory: 0b000_000_110n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Win,
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when player O move after win player X", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b111_000_000n,
        playerOTerritory: 0b000_000_111n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Player two played after game was already won",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return tie when all squares are filled", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b110_001_101n,
        playerOTerritory: 0b001_110_010n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Tie,
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when players occupy the same square", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b100_000_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Players cannot occupy the same square",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when teritory is bigger than board", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b100_000_000_0n,
        playerOTerritory: 0b100_000_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Territory is bigger than board",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is smaller than 3", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b000_100_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(board, 2);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is bigger than board width", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b000_100_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(board, 4);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when line length is bigger than board height", () => {
      const board: Board = {
        size: boardSize,
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b000_100_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Line length must be at least 3 and not bigger than board size",
      };

      const result = validate(board, 4);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board width is smaller than 3", () => {
      const board: Board = {
        size: {
          width: 2n,
          height: 3n,
        },
        playerXTerritory: 0b100_000n,
        playerOTerritory: 0b000_100n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board height is smaller than 3", () => {
      const board: Board = {
        size: {
          width: 3n,
          height: 2n,
        },
        playerXTerritory: 0b100_000n,
        playerOTerritory: 0b000_100n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board width is bigger than 10", () => {
      const board: Board = {
        size: {
          width: 11n,
          height: 3n,
        },
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b000_100_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return error when board height is bigger than 10", () => {
      const board: Board = {
        size: {
          width: 3n,
          height: 11n,
        },
        playerXTerritory: 0b100_000_000n,
        playerOTerritory: 0b000_100_000n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Error,
        error: "Board size must be at least 3 and not bigger than 10",
      };

      const result = validate(board, lineLength);

      expect(result).toEqual(expectedOutput);
    });

    it("should return play when board has max size and game can continue", () => {
      const board: Board = {
        size: {
          width: 10n,
          height: 10n,
        },
        playerXTerritory:
          0b1111111110_1111111110_1111111110_1111111110_1111111110_0000000000_0000000000_0000000000_0000000000_0000000000n,
        playerOTerritory:
          0b0000000000_0000000000_0000000000_0000000000_0000000000_1111111110_1111111110_1111111110_1111111110_1111111110n,
      };
      const expectedOutput = {
        status: ValidationStatusEnum.Play,
      };

      const result = validate(board, 10);

      expect(result).toEqual(expectedOutput);
    });
  });
});
