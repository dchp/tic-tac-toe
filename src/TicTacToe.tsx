import createGameStore, { GameStore } from "./components/Board/gameStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import PlayerTypeEnum from "./components/Board/types/PlayerType";
import { computeBestMoveAsync } from "./components/Board/computerAI";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GameStateEnum from "./components/Board/types/GameStateEnum";
import BoardType from "./components/Board/types/Board";
import Board from "./components/Board/Board";

const TicTacToe = observer(() => {
  const [gameStore] = useState(
    createGameStore(
      {
        size: { width: 8, height: 8 },
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      } as BoardType,
      5,
      (error: string) => {
        console.error(error);
      }
    )
  );

  useEffect(() => {
    if (gameStore.playerTypeOnMove === PlayerTypeEnum.Computer) {
      const markBestMoveAsync = async () => {
        const bestMove = await computeBestMoveAsync(
          gameStore.board,
          gameStore.playerOnMove!,
          gameStore.lineLengthToWin
        );
        gameStore.turnTo(bestMove);
      };

      markBestMoveAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStore.playerOnMove]);

  return (
    <>
      <CssBaseline />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        height={"100vh"}
        overflow={"hidden"}
      >
        <Box>
          <Typography variant="body1">
            {`Player X (${gameStore.playerX})`}
          </Typography>
          <Typography variant="h4" component="h1">
            Tic-Tac-Toe
          </Typography>
          <Typography variant="body1">{`Player O (${gameStore.playerO})`}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{GetGameMessage(gameStore)}</Typography>
        </Box>
        <Box
          flexGrow={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Board
            gameStore={gameStore}
            onSquareClick={(squareIndex) => {
              gameStore.markField(squareIndex);
            }}
          />
        </Box>
      </Box>
    </>
  );
});

const GetGameMessage = (gameStore: GameStore): string => {
  if (gameStore.gameState === GameStateEnum.Win) {
    return `Player ${gameStore.playerOnMove} wins!`;
  }

  if (gameStore.gameState === GameStateEnum.Tie) {
    return `It's a tie!`;
  }

  return `It's player ${gameStore.playerOnMove}'s turn`;
};

export default TicTacToe;
