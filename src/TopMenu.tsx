import { GameStore } from "./components/Board/gameStore";
import { observer } from "mobx-react-lite";
import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import GameStateEnum from "./components/Board/types/GameStateEnum";
import PlayerEnum from "./components/Board/types/PlayerEnum";
import PlayerTypeEnum from "./components/Board/types/PlayerType";
import { runInAction } from "mobx";
import React from "react";

type TopMenuProps = {
  gameStore: GameStore;
};

const TopMenu: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  return (
    <Box m={3} marginBottom={0.5}>
      <Typography variant="h4" component="h1" marginBottom={"10px"}>
        Tic-Tac-Toe
      </Typography>
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
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
      <FormControlLabel
        label={`Player ${PlayerEnum.PlayerX}`}
        style={{ width: "195px", justifyContent: "space-between" }}
        labelPlacement="start"
        control={
          <Select
            value={gameStore.playerX}
            style={{ width: "115px" }}
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
              {PlayerTypeEnum.Computer}
            </MenuItem>
          </Select>
        }
      />

      <FormControlLabel
        label={`Player ${PlayerEnum.PlayerO}`}
        style={{ width: "195px", justifyContent: "space-between" }}
        labelPlacement="start"
        control={
          <Select
            value={gameStore.playerO}
            style={{ width: "115px" }}
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
              {PlayerTypeEnum.Computer}
            </MenuItem>
          </Select>
        }
      />
    </Box>
  );
});

const BoardSetting: React.FC<TopMenuProps> = observer(({ gameStore }) => {
  return (
    <Box
      display={"flex"}
      alignItems="flex-start"
      flexDirection={"column"}
      gap={"5px"}
      marginLeft={"15px"}
    >
      <FormControlLabel
        label={"Board size"}
        style={{ width: "240px", justifyContent: "space-between" }}
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
                runInAction(
                  () => (gameStore.size.width = Number(event.target.value))
                );
              }}
            />
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
                runInAction(
                  () => (gameStore.size.height = Number(event.target.value))
                );
              }}
            />
          </Box>
        }
      />

      <FormControlLabel
        label={"Line length"}
        labelPlacement="start"
        disabled={gameStore.isGameStarted}
        control={
          <Box marginLeft={"8px"} flexGrow={1}>
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
              onChange={(event) =>
                runInAction(
                  () => (gameStore.lineLength = Number(event.target.value))
                )
              }
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
