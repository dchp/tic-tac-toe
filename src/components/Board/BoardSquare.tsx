import { Button, Typography } from "@mui/material";
import BoardSquareEnum from "./types/BoardSquareEnum";
import React from "react";

type BoardSquareProps = {
  state: BoardSquareEnum;
  size: number;
  isClicable: boolean;
  onClick: () => void;
  index: bigint;
};

const BoardSquare: React.FC<BoardSquareProps> = ({
  state,
  size,
  isClicable,
  onClick,
  index,
}) => {
  const backgroundColor =
    state === BoardSquareEnum.PlayerO
      ? "red"
      : state === BoardSquareEnum.PlayerX
      ? "blue"
      : "yellow";

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
        backgroundColor: backgroundColor,
        "&:hover": {
          backgroundColor: backgroundColor,
          boxShadow: "none",
          cursor: isClicable ? "pointer" : "auto",
        },
      }}
      onClick={() => isClicable && onClick()}
    >
      <Typography color={"black"}>{Number(index)}</Typography>
    </Button>
  );
};

export default BoardSquare;
