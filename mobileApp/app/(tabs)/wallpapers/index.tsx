import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { RefreshCw } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { wallpaperService } from "../../../services/wallpaper.service";
import { Wallpaper } from "../../../utils/types";

export default function WallpapersScreen() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  const fetchWallpapers = async (pageNum: number) => {
    try {
      const data = await wallpaperService.getAll(pageNum);
      setWallpapers(data.wallpapers);
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch (error) {
      toast.show("Failed to load wallpapers", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const data = await wallpaperService.getAll(page + 1);
      setWallpapers([...wallpapers, ...data.wallpapers]);
      setPage(page + 1);
    } catch (error) {
      toast.show("Failed to load more wallpapers", { type: "danger" });
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-6">
        <View className="border-l-4 border-white pl-4 mb-8">
          <Text className="text-3xl font-bold text-white tracking-tight">All Wallpapers</Text>
          <Text className="text-sm text-neutral-400 mt-2 max-w-md">
            The most popular high-resolution architectural and minimalist wallpapers as ranked by the community.
          </Text>
        </View>

        {loading ? (
          <View className="flex-row flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <View key={i} className="w-[48%] mb-4">
                <View className="bg-neutral-900 aspect-[4/5] rounded" />
                <View className="mt-2 h-3 bg-neutral-900 rounded w-2/3" />
                <View className="mt-1 h-2.5 bg-neutral-900 rounded w-1/2" />
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-2">
            {wallpapers.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[48%] mb-4 active:opacity-80 will-change-pressable"
                onPress={() => router.push({ pathname: "/wallpapers/[id]", params: { id: item.id } })}
              >
                <View className="bg-neutral-900 aspect-[4/5] overflow-hidden relative">
                  <Image source={{ uri: item.thumbs }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute inset-0 bg-black/60 justify-end p-4">
                    <View className="mb-2">
                      <Text className="text-xs text-white bg-white/10 px-2 py-0.5 self-start">{item.category}</Text>
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

        <View className="items-center py-8">
          {loadingMore ? (
            <RefreshCw size={24} color="#737373" />
          ) : page < totalPages ? (
            <TouchableOpacity onPress={loadMore} className="px-8 py-3 border border-neutral-700 active:opacity-80">
              <Text className="text-sm text-white uppercase tracking-wider">Load More</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-sm text-neutral-500">No more wallpapers</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
