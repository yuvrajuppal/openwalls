import { useState, useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { RefreshCw } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { wallpaperService } from "../../services/wallpaper.service";
import { Wallpaper } from "../../utils/types";

export default function HomeScreen() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wallpaperService.getRandom();
      setWallpapers(data);
    } catch (error) {
      toast.show("Failed to load wallpapers", { type: "danger" });
      setWallpapers([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-4">
        <View className="flex-row justify-between items-end border-b border-neutral-800 pb-4 mb-6">
          <View>
            <Text className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-2">Discover</Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-2xl font-bold text-white tracking-tight uppercase">Random Wallpapers</Text>
              <TouchableOpacity onPress={fetchRandom} className="p-2 border border-neutral-700 active:opacity-80">
                <RefreshCw size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/wallpapers/index")}>
            <Text className="text-xs text-neutral-400 flex-row items-center gap-1">View All →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="flex-row flex-wrap px-2 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <View key={i} className="w-[48%] mb-4">
              <View className="bg-neutral-900 aspect-[4/5] rounded" />
              <View className="mt-2 h-3 bg-neutral-900 rounded w-2/3" />
              <View className="mt-1 h-2.5 bg-neutral-900 rounded w-1/2" />
            </View>
          ))}
        </View>
      ) : (
        <View className="flex-row flex-wrap px-2 gap-2">
          {wallpapers.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-[48%] mb-4 active:opacity-80 will-change-pressable"
              onPress={() => router.push({ pathname: "/wallpapers/[id]", params: { id: item.id } })}
            >
              <View className="bg-neutral-900 aspect-[4/5] overflow-hidden relative">
                <Image source={{ uri: item.thumbs }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute inset-0 bg-black/60 justify-end p-4">
                  <View className="mb-3">
                    <Text className="text-xs text-white bg-white/10 px-2 py-1 self-start">{item.category}</Text>
                  </View>
                  <View className="border-t border-white/20 pt-3">
                    <Text className="text-xs text-white tracking-[0.15em] uppercase">{item.resolution}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
