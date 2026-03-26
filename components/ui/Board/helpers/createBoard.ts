import {
  CELLS_TO_SHOW_EASY,
  CELLS_TO_SHOW_HARD,
  CELLS_TO_SHOW_MEDIUM,
  TOTAL_AMOUNT,
  type Cell,
} from "../../../../constants/Cell";
import { fillGrid } from "./fillGrid";

type CreateBoardResult = {
  solution: Cell[];
  puzzle: Cell[];
};

export interface IcreateBoardProps {
  complexity?: "Easy" | "Medium" | "Hard";
}

export const createBoard = ({
  complexity = "Medium",
}: IcreateBoardProps = {}): CreateBoardResult => {
  const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  let cellsToShow = 0;
  if (complexity === "Easy") {
    cellsToShow = CELLS_TO_SHOW_EASY;
  } else if (complexity === "Medium") {
    cellsToShow = CELLS_TO_SHOW_MEDIUM;
  } else if (complexity === "Hard") {
    cellsToShow = CELLS_TO_SHOW_HARD;
  }

  fillGrid(grid, 0);

  const solution: Cell[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      solution.push({ number: grid[row][col], row, col });
    }
  }

  const puzzle: Cell[] = [];
  const indices = Array.from({ length: TOTAL_AMOUNT }, (_, i) => i);

  for (let i = 0; i < cellsToShow; i++) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    const cellIndex = indices.splice(randomIndex, 1)[0];
    puzzle.push(solution[cellIndex]);
  }

  return { solution, puzzle };
};
