import ValidationStatusEnum from "./ValidationStatusEnum";

export enum GameStateEnum {
  Play,
  Win,
  Tie,
}

export const createGameState = (
  validationStatus: ValidationStatusEnum
): GameStateEnum => {
  switch (validationStatus) {
    case ValidationStatusEnum.Win:
      return GameStateEnum.Win;
    case ValidationStatusEnum.Tie:
      return GameStateEnum.Tie;
    default:
      return GameStateEnum.Play;
  }
};

export default GameStateEnum;
