import { create } from "zustand";

const useSelectedDigit = create<{
  selectedDigit: number;
  setSelectedDigit: (state: number) => void;
}>((set) => ({
  selectedDigit: 0,
  setSelectedDigit: (state: number) => set({ selectedDigit: state }),
}));

export default useSelectedDigit;
