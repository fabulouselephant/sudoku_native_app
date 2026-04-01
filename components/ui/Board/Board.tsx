import * as Haptics from "expo-haptics";
import { ReactElement, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyBoardNumbers } from "../KeyBoradNumbers/KeyBoardNumbers";
import useErrorCounterStore from "./store/errorCounterStore";
import useGameStore from "./store/gameStore";
import useSelectedDigit from "./store/selectedDigit";

const digitColors: Record<number, string> = {
  1: "text-orange-400",
  2: "text-green-500",
  3: "text-emerald-500",
  4: "text-yellow-500",
  5: "text-orange-500",
  6: "text-slate-500",
  7: "text-teal-500",
  8: "text-purple-500",
  9: "text-cyan-400",
};

const getRandomColorClass = (digit: number) =>
  digitColors[digit] ?? "text-black";

export default function Board(): ReactElement {
  const {
    solution,
    puzzle,
    userInputs,
    userColors,
    setUserInput,
    isGameOver,
    setIsGameOver,
  } = useGameStore();
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [wrongCell, setWrongCell] = useState<{
    row: number;
    col: number;
    digit: number;
  } | null>(null);

  const [gameIsLost, setGameIsLost] = useState<boolean>();
  const { errorCounter, increaseErrorConter } = useErrorCounterStore();

  const { selectedDigit, setSelectedDigit } = useSelectedDigit();

  const grid = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => {
      const cell = puzzle.find((c) => c.row === row && c.col === col);
      if (cell) return cell.number;
      const key = `${row}-${col}`;
      return userInputs[key] ?? 0;
    }),
  );

  const onCellSelect = (rowIndex: number, colIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedCell({
      row: rowIndex,
      col: colIndex,
    });
    const selectedDigit = grid[rowIndex][colIndex];
    setSelectedDigit(selectedDigit !== 0 ? selectedDigit : 0);
  };

  const handleNumberClick = (digit: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const correctCell = solution.find((c) => c.row === row && c.col === col);
    if (correctCell && correctCell.number === digit) {
      const key = `${row}-${col}`;
      setUserInput(key, digit, getRandomColorClass(digit));
      setSelectedDigit(digit);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setWrongCell({ row, col, digit });
      setTimeout(() => setWrongCell(null), 1000);
      increaseErrorConter();
      if (errorCounter >= 3) {
        setGameIsLost(true);
        setIsGameOver();
      }
    }
  };

  return (
    <>
      <View className="mx-auto my-6 flex-row gap-2">
        <Text>errors: {errorCounter}</Text>
        <Text>errors: {errorCounter}</Text>
      </View>
      <View className="w-fit border mx-auto rounded-md">
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row">
            {row.map((cellValue, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              const isSelected =
                selectedCell?.row === rowIndex &&
                selectedCell?.col === colIndex;
              const isHighlighted =
                selectedDigit !== 0 && selectedDigit === cellValue;
              const colorClass = userColors?.[cellKey] || "";
              return (
                <Pressable
                  onPress={() => onCellSelect(rowIndex, colIndex)}
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-10 h-10 items-center justify-center
                    ${colIndex !== 8 ? "border-r" : ""}
                    ${rowIndex !== 8 ? "border-b" : ""}
                    ${colIndex % 3 === 2 && colIndex !== 8 ? "border-b-black" : "border-r-gray-300"}
                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-black" : "border-b-gray-300"}
                    ${wrongCell?.row === rowIndex && wrongCell?.col === colIndex ? "text-red-500 bg-red-100" : ""}
                    ${isSelected || isHighlighted ? "bg-blue-100" : ""}
                    ${colorClass}`}
                >
                  <Text
                    className={
                      wrongCell?.row === rowIndex && wrongCell?.col === colIndex
                        ? "text-red-500"
                        : colorClass
                    }
                  >
                    {wrongCell?.row === rowIndex && wrongCell?.col === colIndex
                      ? wrongCell.digit
                      : cellValue !== 0
                        ? cellValue
                        : ""}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
      <View>
        <KeyBoardNumbers grid={grid} onNumberClick={handleNumberClick} />
      </View>
    </>
  );
}
