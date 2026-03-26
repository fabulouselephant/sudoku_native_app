export const checkAllDigitsAreSet = (
  grid: number[][],
  digit: number,
): boolean => {
  const count = grid.flat().filter((v) => v === digit).length;
  return count === 9;
};
