import BoardSize from "./BoardSize";
import BoardTerritory from "./BoardTerritory";

type Board = {
  size: BoardSize;
  playerXTerritory: BoardTerritory;
  playerOTerritory: BoardTerritory;
};

export default Board;
