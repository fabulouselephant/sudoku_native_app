import { Cell } from "@/constants/Cell";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createBoard, IcreateBoardProps } from "../helpers/createBoard";
import { storage } from "./storage";

interface GameState {
  solution: Cell[];
  puzzle: Cell[];
  userInputs: Record<string, number>;
  userColors: Record<string, string>;
  newGame: (complexity: IcreateBoardProps) => void;
  setUserInput: (key: string, digit: number, colorClass: string) => void;
  setIsGameOver: () => void;
  isGameOver: boolean;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...createBoard(),
      userInputs: {},
      userColors: {},
      isGameOver: false,
      newGame: (complexity) =>
        set({
          ...createBoard(complexity),
          userInputs: {},
          userColors: {},
          isGameOver: false,
        }),
      setUserInput: (key, digit, colorClass) =>
        set((state) => ({
          userInputs: { ...state.userInputs, [key]: digit },
          userColors: { ...state.userColors, [key]: colorClass },
        })),
      setIsGameOver: () =>
        set((state) => ({
          isGameOver: true,
        })),
    }),
    {
      name: "sudoku-game",
      storage,
    },
  ),
);

export default useGameStore;
