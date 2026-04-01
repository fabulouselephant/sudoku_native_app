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
  timeSpent: number;
  setTimeSpent: (seconds: number) => void;
  incrementTime: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...createBoard(),
      userInputs: {},
      userColors: {},
      isGameOver: false,
      timeSpent: 0,
      setTimeSpent: (seconds) => set({ timeSpent: seconds }),
      incrementTime: () => set((state) => ({ timeSpent: state.timeSpent + 1 })),
      newGame: (complexity) =>
        set({
          ...createBoard(complexity),
          userInputs: {},
          userColors: {},
          isGameOver: false,
          timeSpent: 0,
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
