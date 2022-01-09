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
import * as Linking from "expo-linking";

export const queryClient = new QueryClient();
const apiClient = createApiClient();

function useEpisodes() {
  return useQuery("episodes", () => apiClient.getEpisodes());
}

function useAppStartup() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const { isLoading } = useEpisodes();

  return {
    loading: isLoading || !fontsLoaded,
  };
}

function AppWrapper() {
  const { loading } = useAppStartup();

  if (loading) {
    return <AppLoading />;
  }

  return <EpisodeScreen />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  );
}

function EpisodeScreen() {
  function onPlay(track: EpisodeDTO) {
    Linking.openURL(track.url);
  }

  const statusBarHeight = NativeStatusBar.currentHeight ?? 0;
  const offset = statusBarHeight + 16;

  const { isLoading, data: episodes, error } = useEpisodes();

  return isLoading ? (
    <></>
  ) : (
    <SafeAreaView style={tailwind("flex h-full")}>
      <AppBar offset={offset} />
      {episodes && (
        <FlatList
          style={tailwind("h-full pt-2 pb-10 flex-1")}
          contentContainerStyle={tailwind("pb-4")}
          data={episodes}
          renderItem={(epItem) => (
            <Episode onPlay={() => onPlay(epItem.item)} episode={epItem.item} />
          )}
          keyExtractor={(ep) => ep._id}
        />
      )}
    </SafeAreaView>
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
