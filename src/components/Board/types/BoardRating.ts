type BoardRating = { value: number; isWinner: boolean; isLooser: boolean };

export const negateRating = (rating: BoardRating): BoardRating => {
  const isWinner = rating.isWinner;
  const isLooser = rating.isLooser;

  rating.value = -rating.value;

  if (isWinner) {
    rating.isLooser = true;
  }

  if (isLooser) {
    rating.isWinner = true;
  }

  return rating;
};

export default BoardRating;
