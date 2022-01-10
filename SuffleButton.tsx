import { IconShuffle } from "./Icons";
import React from "react";
import tailwind from "tailwind-rn";
import { AppText } from "./AppText";
import { Pressable } from "react-native";

type Props = {
  onClick: () => void;
};

export function ShuffleButton({ onClick }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        tailwind(
          "bg-indigo-600 py-5 px-5 rounded-full flex flex-row items-center justify-center"
        ),
        pressed && tailwind("bg-indigo-700"),
      ]}
      android_ripple={{ color: "rgb(79 70 229)" }}
      onPress={() => onClick()}
    >
      <IconShuffle style={tailwind("text-white w-5 h-5")} />
      <AppText
        weight="semiBold"
        style={[
          tailwind("ml-4 text-white text-base"),
          {
            lineHeight: 20,
          },
        ]}
      >
        Play Random
      </AppText>
    </Pressable>
  );
}
