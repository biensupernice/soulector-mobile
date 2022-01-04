import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  StatusBar as NativeStatusBar,
  FlatList,
} from "react-native";
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
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { createApiClient, EpisodeDTO } from "./apiClient";
import { SoulectionLogo } from "./Icons";

export const queryClient = new QueryClient();
const apiClient = createApiClient();

export default function App() {
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!fontsLoaded ? <AppLoading /> : <EpisodeScreen />}
      </QueryClientProvider>
    </>
  );
}

function EpisodeScreen() {
  function onPlay(track: EpisodeDTO) {
    alert(`onPlay ${track.name}`);
  }

  const statusBarHeight = NativeStatusBar.currentHeight ?? 0;
  const offset = statusBarHeight + 16;

  // Queries
  const {
    isLoading,
    data: episodes,
    error,
  } = useQuery("episodes", async () => await apiClient.getEpisodes());

  return isLoading ? (
    <AppLoading />
  ) : (
    <>
      <SafeAreaView style={tailwind("flex h-full")}>
        <AppBar offset={offset} />
        {episodes && (
          <FlatList
            style={tailwind("h-full pt-2 pb-10 flex-1")}
            contentContainerStyle={tailwind("pb-4")}
            data={episodes}
            renderItem={(epItem) => (
              <Episode
                onPlay={() => onPlay(epItem.item)}
                episode={epItem.item}
              />
            )}
            keyExtractor={(ep) => ep._id}
          />
        )}
      </SafeAreaView>
    </>
  );
}

interface AppBarProps {
  offset: number;
}

function AppBar({ offset }: AppBarProps) {
  return (
    <>
      <StatusBar style="dark" />
      <View
        style={[
          { paddingTop: offset },
          tailwind(
            "flex flex-row pb-4 px-4 items-center bg-white border-b border-gray-200"
          ),
        ]}
      >
        <SoulectionLogo style={tailwind("text-black h-8 w-8 mr-2")} />
        <AppText weight="bold" style={tailwind("text-black text-lg")}>
          Soulection
        </AppText>
      </View>
    </>
  );
}
