import createGameStore from "./components/Board/gameStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { computeBestMoveAsync } from "./components/Board/computerAI";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import BoardType from "./components/Board/types/Board";
import Board from "./components/Board/Board";
import TopMenu from "./TopMenu";
import { runInAction } from "mobx";
import GameStateEnum from "./components/Board/types/GameStateEnum";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #bdbdbd;
        }
      `,
    },
  },
});

const TicTacToe = observer(() => {
  const [gameStore] = useState(
    createGameStore(
      {
        size: { width: 4, height: 4 },
        playerXTerritory: 0n,
        playerOTerritory: 0n,
      } as BoardType,
      4,
      (error: string) => {
        console.error(error);
      }
    )
  );

  useEffect(() => {
    if (
      gameStore.gameState !== GameStateEnum.Play ||
      !gameStore.isComputerOnMove ||
      gameStore.isComputerThinking
    ) {
      return;
    }

    const markBestMoveAsync = async () => {
      runInAction(() => (gameStore.isComputerThinking = true));

      const bestMove = await computeBestMoveAsync(
        gameStore.board,
        gameStore.playerOnMove!,
        gameStore.lineLength
      );

      gameStore.turnTo(bestMove);
      runInAction(() => (gameStore.isComputerThinking = false));
    };

    console.debug("computer move");
    markBestMoveAsync();
  }, [
    gameStore,
    gameStore.playerOnMove,
    gameStore.playerTypeOnMove,
    gameStore.isComputerThinking,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        height={"100vh"}
        overflow={"hidden"}
      >
        <TopMenu gameStore={gameStore} />
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
    </ThemeProvider>
  );
});

export default TicTacToe;
