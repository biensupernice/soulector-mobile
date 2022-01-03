import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, StatusBar as NativeStatusBar } from "react-native";
import tailwind from "tailwind-rn";
import { Episode } from "./Episode";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import AppLoading from "expo-app-loading";
import { AppText } from "./AppText";

const testTrack = {
  _id: "61b94a4bfc77053f649305a3",
  source: "SOUNDCLOUD",
  duration: 7205,
  created_time: "2021-12-10T05:32:38.000Z",
  key: 1175328085,
  name: "Soulection Radio Show #531",
  url: "https://soundcloud.com/soulection/soulection-radio-show-531",
  picture_large:
    "https://i1.sndcdn.com/artworks-LfpogzFN5EWQ6Mok-KWiszg-t500x500.jpg",
};

export type EpisodeModel = typeof testTrack;

export default function App() {
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  function onPlay(track: EpisodeModel) {
    alert(`onPlay ${track.name}`);
  }

  const statusBarHeight = NativeStatusBar.currentHeight ?? 0;
  const offset = statusBarHeight + 16;

  return (
    <>
      {!fontsLoaded ? (
        <AppLoading />
      ) : (
        <>
          <StatusBar style="light" />
          <SafeAreaView style={tailwind("flex h-full")}>
            <View
              style={[
                { paddingTop: offset },
                tailwind("pb-4 px-4 items-start bg-gray-900"),
              ]}
            >
              <AppText weight="bold" style={tailwind("text-white text-lg")}>
                Soulection
              </AppText>
            </View>
            <View style={tailwind("h-full pt-4")}>
              <Episode onPlay={() => onPlay(testTrack)} episode={testTrack} />
              <Episode
                onPlay={() => onPlay(testTrack)}
                playing
                episode={testTrack}
              />
              <Episode onPlay={() => onPlay(testTrack)} episode={testTrack} />
              <Episode onPlay={() => onPlay(testTrack)} episode={testTrack} />
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
}
