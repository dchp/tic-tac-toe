import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BoardSquareEnum from "./types/BoardSquareEnum";
import BoardSquare from "./BoardSquare";
import { GameStore } from "./gameStore";
import { squareIndexes } from "./types/Board";
import GameStateEnum from "./types/GameStateEnum";
import PlayerTypeEnum from "./types/PlayerType";

type BoardProps = {
  gameStore: GameStore;
  onSquareClick: (squareIndex: bigint) => void;
};

const Board: React.FC<BoardProps> = ({ gameStore, onSquareClick }) => {
  const board = gameStore.board;
  const parentBoxRef = useRef<HTMLDivElement | null>(null);
  const [squareSize, setSquareSize] = useState(0);
  const boardMargin = 10;

  useEffect(() => {
    const updateSquareSize = () => {
      if (parentBoxRef.current) {
        const { width, height } = parentBoxRef.current.getBoundingClientRect();

        const squareWidthMax = (width - 2 * boardMargin) / board.size.width;
        const squareHeightMax = (height - 2 * boardMargin) / board.size.height;
        const squareSize = Math.min(squareWidthMax, squareHeightMax);

        setSquareSize(squareSize);
      }
    };

    updateSquareSize();
    window.addEventListener("resize", updateSquareSize);

    return () => {
      window.removeEventListener("resize", updateSquareSize);
    };
  }, [board.size.height, board.size.width]);

  return (
    <Grid
      ref={parentBoxRef}
      width={"100%"}
      height={"100%"}
      mt={boardMargin / 8}
      ml={boardMargin / 4}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${board.size.width}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${board.size.height}, ${squareSize}px)`,
      }}
    >
      {squareSize !== 0 &&
        board.playerXTerritory !== undefined &&
        [...squareIndexes(board)].map((squareIndex) => {
          const mask = 1n << squareIndex;
          const isPlayerX = (board.playerXTerritory & mask) !== 0n;
          const isPlayerO = (board.playerOTerritory & mask) !== 0n;
          const state = isPlayerX
            ? BoardSquareEnum.PlayerX
            : isPlayerO
            ? BoardSquareEnum.PlayerO
            : BoardSquareEnum.Empty;

          return (
            <BoardSquare
              key={`${squareIndex}(${board.size.width}x${board.size.height})`}
              state={state}
              size={squareSize}
              isClicable={
                state === BoardSquareEnum.Empty &&
                gameStore.gameState === GameStateEnum.Play &&
                gameStore.playerTypeOnMove === PlayerTypeEnum.Human
              }
              onClick={() => onSquareClick(squareIndex)}
              index={squareIndex}
            />
          );
        })}
    </Grid>
  );
};

export default Board;
