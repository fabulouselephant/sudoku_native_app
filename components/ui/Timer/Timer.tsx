import useGameStore from "@/components/ui/Board/store/gameStore";
import { useEffect } from "react";
import { Text } from "react-native";

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hours * 3600) / 60);
  const secs = seconds - hours * 3600 - mins * 60;
  return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const Timer = () => {
  const { timeSpent, incrementTime, isGameOver } = useGameStore();

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  return <Text className="text-base">time: {formatTime(timeSpent)}</Text>;
};
