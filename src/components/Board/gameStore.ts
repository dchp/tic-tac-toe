import { makeAutoObservable } from "mobx";
import PlayerEnum from "./types/PlayerEnum";
import validate from "./boardValidation";
import { GameStateEnum, createGameState } from "./types/GameStateEnum";
import PlayerTypeEnum from "./types/PlayerType";
import Board from "./types/Board";
import BoardTerritory from "./types/BoardTerritory";
import BoardSize from "./types/BoardSize";

export type GameStore = {
  size: BoardSize;
  playerXTerritory: BoardTerritory;
  playerOTerritory: BoardTerritory;
  lineLengthToWin: number;
  playerX: PlayerTypeEnum;
  playerO: PlayerTypeEnum;
  gameState: GameStateEnum;
  playerOnMove?: PlayerEnum;
  playerTypeOnMove?: PlayerTypeEnum;
  board: Board;
  switchPlayer(): void;
  markField(fieldIndex: bigint): void;
  turnTo(newBoard: Board): void;
};

function createGameStore(
  board: Board,
  lineLengthToWin: number,
  onError?: (error: string) => void
): GameStore {
  return makeAutoObservable({
    lineLengthToWin: lineLengthToWin,
    size: board.size,
    playerXTerritory: board.playerXTerritory,
    playerOTerritory: board.playerOTerritory,
    playerX: PlayerTypeEnum.Human as PlayerTypeEnum,
    playerO: PlayerTypeEnum.Computer as PlayerTypeEnum,
    gameState: GameStateEnum.Play as GameStateEnum,
    playerOnMove: PlayerEnum.PlayerX as PlayerEnum | undefined,

    markField: function (fieldIndex: bigint) {
      const newBoard = this.board;

      if (this.playerOnMove === PlayerEnum.PlayerX) {
        newBoard.playerXTerritory |= 1n << fieldIndex;
      } else {
        newBoard.playerOTerritory |= 1n << fieldIndex;
      }

      this.turnTo(newBoard);
    },

    turnTo: function (newBoard: Board) {
      const validattion = validate(newBoard, this.lineLengthToWin);

      if (validattion.error && onError) {
        onError(validattion.error);
        return;
      }

      this.gameState = createGameState(validattion.status);
      this.board = newBoard;
      this.switchPlayer();
    },

    get playerTypeOnMove(): PlayerTypeEnum | undefined {
      if (!this.playerOnMove) {
        return undefined;
      }

      return this.playerOnMove === PlayerEnum.PlayerX
        ? this.playerX
        : this.playerO;
    },

    get board(): Board {
      return {
        playerXTerritory: this.playerXTerritory,
        playerOTerritory: this.playerOTerritory,
        size: this.size,
      };
    },

    set board(board: Board) {
      this.playerXTerritory = board.playerXTerritory;
      this.playerOTerritory = board.playerOTerritory;
      this.size = board.size;
    },

    switchPlayer() {
      if (this.gameState === GameStateEnum.Play) {
        this.playerOnMove =
          this.playerOnMove === PlayerEnum.PlayerX
            ? PlayerEnum.PlayerO
            : PlayerEnum.PlayerX;
      }
    },
  });
}

export default createGameStore;
