enum PlayerEnum {
  PlayerX = "❌",
  PlayerO = "🔵",
}

export const getOponent = (player: PlayerEnum): PlayerEnum => {
  return player === PlayerEnum.PlayerX
    ? PlayerEnum.PlayerO
    : PlayerEnum.PlayerX;
};

export default PlayerEnum;
