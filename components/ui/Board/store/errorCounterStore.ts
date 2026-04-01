import { create } from "zustand";

const useErrorCounterStore = create<{
  errorCounter: number;
  increaseErrorConter: () => void;
  resetErrorCounter: () => void;
}>((set) => ({
  errorCounter: 0,
  increaseErrorConter: () =>
    set((state) => ({ errorCounter: state.errorCounter + 1 })),
  resetErrorCounter: () => set({ errorCounter: 0 }),
}));

export default useErrorCounterStore;
