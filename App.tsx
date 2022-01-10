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
import { ShuffleButton } from "./SuffleButton";

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

  function onRandomClick() {
    if (episodes) {
      const randomIndex = Math.floor(Math.random() * episodes.length);
      onPlay(episodes[randomIndex]);
    }
  }

  return isLoading ? (
    <></>
  ) : (
    <SafeAreaView style={tailwind("flex h-full bg-white relative")}>
      <AppBar offset={offset} />
      {episodes && (
        <>
          <FlatList
            ListHeaderComponent={<BeforeList numEpisodes={episodes.length} />}
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
          <View
            style={[
              tailwind(
                "absolute bg-transparent right-0 bottom-0 mb-8 mr-4 z-10"
              ),
            ]}
          >
            <ShuffleButton onClick={onRandomClick} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

interface BeforeListProps {
  numEpisodes: number;
  filterText?: string;
}
function BeforeList({ numEpisodes, filterText }: BeforeListProps) {
  return (
    <View
      style={tailwind(
        "px-4 flex flex-row items-center justify-between py-2"
      )}
    >
      <AppText weight="semiBold" style={tailwind("text-base text-indigo-900")}>
        {filterText ? `Episodes matching "${filterText}"` : "All Episodes"}
      </AppText>
      <AppText weight="semiBold" style={tailwind("text-base text-gray-600")}>
        {numEpisodes} Total
      </AppText>
    </View>
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
