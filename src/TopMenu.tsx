import { GameStore } from "./components/Board/gameStore";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import GameStateEnum from "./components/Board/types/GameStateEnum";
import PlayerEnum from "./components/Board/types/PlayerEnum";
import PlayerTypeEnum from "./components/Board/types/PlayerType";
import { runInAction } from "mobx";
import React from "react";
import theme from "./theme/theme";

type TopMenuProps = {
  gameStore: GameStore;
};

const TopMenu: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  return (
    <Box m={3} marginBottom={0.5}>
      <Box
        display="flex"
        flexDirection={"row"}
        gap="10px"
        marginBottom={"10px"}
      >
        <Typography variant="h4" component="h1">
          Tic-Tac-Toe
        </Typography>
        <Button
          color="primary"
          onClick={() => {
            gameStore.resetGame();
          }}
          startIcon={<RefreshIcon />}
          disabled={gameStore.isComputerThinking}
        >
          New Game
        </Button>
      </Box>

      <Box
        display={"flex"}
        alignItems="flex-start"
        flexDirection={"row"}
        marginBottom="10px"
      >
        <PlayersSetting gameStore={gameStore} />
        <BoardSetting gameStore={gameStore} />
      </Box>
      <GameMessage gameStore={gameStore} />
    </Box>
  );
});

const PlayersSetting: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(500));
  const labelWidth = isMobile ? "130px" : "195px";

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
      <FormControlLabel
        label={isMobile ? PlayerEnum.PlayerX : `Player ${PlayerEnum.PlayerX}`}
        style={{
          width: labelWidth,
          justifyContent: "space-between",
        }}
        labelPlacement="start"
        control={
          <Select
            value={gameStore.playerX}
            style={{ width: isMobile ? "105px" : "115px" }}
            onChange={(event) =>
              runInAction(
                () => (gameStore.playerX = event.target.value as PlayerTypeEnum)
              )
            }
            displayEmpty
          >
            <MenuItem value={PlayerTypeEnum.Human}>
              {PlayerTypeEnum.Human}
            </MenuItem>
            <MenuItem value={PlayerTypeEnum.Computer}>
              {isMobile ? "AI" : PlayerTypeEnum.Computer}
            </MenuItem>
          </Select>
        }
      />

      <FormControlLabel
        label={isMobile ? PlayerEnum.PlayerO : `Player ${PlayerEnum.PlayerO}`}
        style={{ width: labelWidth, justifyContent: "space-between" }}
        labelPlacement="start"
        control={
          <Select
            value={gameStore.playerO}
            style={{ width: isMobile ? "105px" : "115px" }}
            onChange={(event) =>
              runInAction(
                () => (gameStore.playerO = event.target.value as PlayerTypeEnum)
              )
            }
            displayEmpty
          >
            <MenuItem value={PlayerTypeEnum.Human}>
              {PlayerTypeEnum.Human}
            </MenuItem>
            <MenuItem value={PlayerTypeEnum.Computer}>
              {isMobile ? "AI" : PlayerTypeEnum.Computer}
            </MenuItem>
          </Select>
        }
      />
    </Box>
  );
});

const BoardSetting: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(500));

  return (
    <Box
      display={"flex"}
      alignItems="flex-start"
      flexDirection={"column"}
      gap={"5px"}
      marginLeft={"15px"}
    >
      <FormControlLabel
        label={isMobile ? "Board" : "Board size"}
        style={{
          width: isMobile ? "116px" : "240px",
          justifyContent: "space-between",
        }}
        labelPlacement="start"
        disabled={gameStore.isGameStarted}
        control={
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            gap={"6px"}
          >
            <TextField
              type="number"
              sx={{ width: "65px" }}
              disabled={gameStore.isGameStarted}
              InputProps={{
                inputProps: {
                  min: 3,
                  max: 10,
                },
              }}
              value={gameStore.size.width}
              onChange={(event) => {
                runInAction(() => {
                  let width = Number(event.target.value);

                  width = Math.min(Math.max(3, width), 10);
                  gameStore.size.width = width;

                  if (isMobile) {
                    gameStore.size.height = width;
                  }

                  if (gameStore.lineLength > width) {
                    gameStore.lineLength = width;
                  }
                });
              }}
            />
            {!isMobile && (
              <>
                <Typography
                  style={{
                    color: gameStore.isComputerOnMove ? "grey" : "inherit",
                  }}
                >
                  ×
                </Typography>
                <TextField
                  type="number"
                  sx={{ width: "65px" }}
                  disabled={gameStore.isGameStarted}
                  InputProps={{
                    inputProps: {
                      min: 3,
                      max: 10,
                    },
                  }}
                  value={gameStore.size.height}
                  onChange={(event) => {
                    runInAction(() => {
                      let height = Number(event.target.value);

                      height = Math.min(Math.max(3, height), 10);
                      gameStore.size.height = height;

                      if (isMobile) {
                        gameStore.size.width = height;
                      }

                      if (gameStore.lineLength > height) {
                        gameStore.lineLength = height;
                      }
                    });
                  }}
                />
              </>
            )}
          </Box>
        }
      />

      <FormControlLabel
        label={isMobile ? "Line" : "Line length"}
        labelPlacement="start"
        disabled={gameStore.isGameStarted}
        control={
          <Box marginLeft={isMobile ? "20px" : "8px"} flexGrow={1}>
            <TextField
              sx={{ width: "65px" }}
              type="number"
              disabled={gameStore.isGameStarted}
              InputProps={{
                inputProps: {
                  min: 3,
                  max: Math.min(gameStore.size.width, gameStore.size.height),
                },
              }}
              value={gameStore.lineLength}
              onChange={(event) => {
                let lineLength = Number(event.target.value);

                lineLength = Math.min(
                  Math.max(3, lineLength),
                  Math.min(gameStore.size.width, gameStore.size.height)
                );

                runInAction(() => (gameStore.lineLength = lineLength));
              }}
            />
          </Box>
        }
      />
    </Box>
  );
});

const GameMessage: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  return (
    <Typography variant="h5" component="h2" marginTop={3} marginBottom={1}>
      {`${GetGameMessage(gameStore)}${
        gameStore.isComputerThinking ? "..." : ""
      }`}
    </Typography>
  );
});

const GetGameMessage = (gameStore: GameStore): string => {
  if (gameStore.gameState === GameStateEnum.Win) {
    return `Player ${gameStore.playerOnMove} WINS!`;
  }

  if (gameStore.gameState === GameStateEnum.Tie) {
    return `It's a TIE!`;
  }

  return `It's player ${gameStore.playerOnMove}'s turn`;
};

export default TopMenu;
