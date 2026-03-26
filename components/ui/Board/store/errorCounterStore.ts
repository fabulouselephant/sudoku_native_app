import { create } from "zustand";

const useErrorCounterStore = create<{
  errorCounter: number;
  increaseErrorConter: () => void;
}>((set) => ({
  errorCounter: 0,
  increaseErrorConter: () =>
    set((state) => ({ errorCounter: (state.errorCounter += 1) })),
}));

export default useErrorCounterStore;
