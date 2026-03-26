import Board from "@/components/ui/Board/Board";
import useGameStore from "@/components/ui/Board/store/gameStore";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const complexityLevels = ["Easy", "Medium", "Hard"] as const;

export default function HomeScreen() {
  const { newGame } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (level: (typeof complexityLevels)[number]) => {
    newGame({ complexity: level });
    setIsOpen(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-1 border-b border-gray-200">
        <Text className="text-xl font-bold">Sudoku</Text>
        <View>
          <Pressable
            onPress={() => setIsOpen(!isOpen)}
            className="px-3 py-2 bg-black rounded-md"
          >
            <Text className="text-white font-medium">New Game</Text>
          </Pressable>
          {isOpen && (
            <View className="absolute top-10 right-0 bg-white border border-gray-200 rounded-md w-36 z-10">
              {complexityLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => handleSelect(level)}
                >
                  <Text>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      <View className="justify-center flex-1">
        <Board />
      </View>
    </SafeAreaView>
  );
}
