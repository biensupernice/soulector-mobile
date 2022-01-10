import { Text, TextProps } from "react-native";
import tailwind from "tailwind-rn";

interface AppTextProps extends TextProps {
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
}
export function AppText({ weight = "regular", style, ...props }: AppTextProps) {
  const mapWeightToFont = {
    light: "SpaceGrotesk_300Light",
    regular: "SpaceGrotesk_400Regular",
    medium: "SpaceGrotesk_500Medium",
    semiBold: "SpaceGrotesk_600SemiBold",
    bold: "SpaceGrotesk_700Bold",
  };

  return (
    <Text
      style={[
        tailwind("text-gray-900"),
        {
          fontFamily: mapWeightToFont[weight],
        },
        style,
      ]}
      {...props}
    ></Text>
  );
}
