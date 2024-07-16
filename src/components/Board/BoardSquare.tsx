import { Button, Typography } from "@mui/material";
import BoardSquareEnum from "./types/BoardSquareEnum";
import React from "react";
import PlayerEnum from "./types/PlayerEnum";
import { observer } from "mobx-react-lite";

type BoardSquareProps = {
  state: BoardSquareEnum;
  size: number;
  isClicable: boolean;
  onClick: () => void;
  index: bigint;
};

const BoardSquare: React.FC<BoardSquareProps> = observer(
  ({ state, size, isClicable, onClick }) => {
    const symbol =
      state === BoardSquareEnum.PlayerO
        ? PlayerEnum.PlayerO
        : state === BoardSquareEnum.PlayerX
        ? PlayerEnum.PlayerX
        : "";

    return (
      <Button
        variant="contained"
        sx={{
          height: `${size}px`,
          width: `${size}px`,
          minWidth: 0,
          padding: 0,
          border: "1px solid gray",
          borderRadius: 0,
          boxShadow: "none",
          backgroundColor: "grey.100",
          "&:hover": {
            backgroundColor: isClicable ? "grey.200" : "grey.100",
            boxShadow: "none",
            cursor: isClicable ? "pointer" : "auto",
          },
        }}
        onClick={() => isClicable && onClick()}
      >
        <Typography sx={{ fontSize: `${size * 0.4}px` }}>{symbol}</Typography>
      </Button>
    );
  }
);

export default BoardSquare;
