import { Text, TouchableHighlight, View } from "react-native";
import { checkAllDigitsAreSet } from "./helpers/checkAllDigitsAreSet";

interface IKeyboardNumberProps {
  onNumberClick: (digit: number) => void;
  grid: number[][];
}

export const KeyBoardNumbers = ({
  onNumberClick,
  grid,
}: IKeyboardNumberProps) => {
  const keyBoardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleNumberClick(num: number) {
    onNumberClick(num);
  }

  const highLighProps = {
    activeOpacity: 0.5,
    underlayColor: "#dbeafe",
  };

  return (
    <View className="flex-row justify-between mx-auto mt-10">
      {keyBoardArray.map((num: number) => {
        const allSet = checkAllDigitsAreSet(grid, num);
        return (
          <TouchableHighlight
            {...highLighProps}
            disabled={allSet}
            key={num}
            onPress={() => handleNumberClick(num)}
          >
            <View
              className={`w-10 h-10 items-center justify-center border-gray-100`}
            >
              <Text className={allSet ? "text-gray-300" : "text-black"}>
                {num}
              </Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};
