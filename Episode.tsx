import { Image, Pressable, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import { formatDate, formatTimeSecs } from "./helpers";
import { IconSpeaker } from "./Icons";
import { EpisodeModel } from "./App";

interface EpisodeProps {
  episode: EpisodeModel;
  playing?: boolean;
  onPlay: () => void;
}
export function Episode({ episode, onPlay, playing = false }: EpisodeProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        tailwind("flex flex-row items-center bg-white px-3 py-2"),
        pressed && tailwind("bg-gray-100"),
      ]}
      android_ripple={{ color: "rgb(79 70 229)" }}
      onPress={onPlay}
    >
      <View
        style={tailwind(
          "rounded overflow-hidden h-16 w-16 bg-gray-200 relative"
        )}
      >
        <Image
          style={tailwind("w-16 h-16")}
          source={{ uri: episode.picture_large }}
        />
        {playing && (
          <View
            style={tailwind(
              "absolute flex items-center justify-center inset-0 rounded-lg"
            )}
          >
            <View
              style={tailwind("absolute inset-0 bg-indigo-600 opacity-75")}
            />
            <View style={tailwind("relative p-1 bg-white rounded-full")}>
              <IconSpeaker style={tailwind("text-indigo-600 w-6 h-6")} />
            </View>
          </View>
        )}
      </View>
      <View style={tailwind("ml-3")}>
        <Text
          style={[
            tailwind("font-bold text-base"),
            playing && tailwind("text-indigo-600"),
          ]}
        >
          {episode.name}
        </Text>
        <View style={tailwind("flex-row")}>
          <Text style={tailwind("text-sm text-gray-700")}>
            {formatDate(episode.created_time)}
          </Text>
          <Text style={tailwind("text-sm text-gray-700 mx-1")}>&bull;</Text>
          <Text style={tailwind("text-sm text-gray-700")}>
            {formatTimeSecs(episode.duration)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
