import { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { Search, SearchX, RefreshCw, ArrowDown, Heart, Download } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { wallpaperService } from "../../../services/wallpaper.service";
import { Wallpaper } from "../../../utils/types";

export default function SearchScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const toast = useToast();

  const handleSearch = useCallback(async () => {
    const trimmed = searchInput.trim();
    if (!trimmed) {
      setQuery("");
      setWallpapers([]);
      setHasSearched(false);
      return;
    }
    setQuery(trimmed);
    setHasSearched(true);
    setLoading(true);
    try {
      const data = await wallpaperService.search(trimmed, 1);
      setWallpapers(data.wallpapers);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setPage(1);
    } catch (error) {
      toast.show("Search failed", { type: "danger" });
      setWallpapers([]);
    } finally {
      setLoading(false);
    }
  }, [searchInput, toast]);

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const data = await wallpaperService.search(query, page + 1);
      setWallpapers([...wallpapers, ...data.wallpapers]);
      setPage(page + 1);
    } catch (error) {
      toast.show("Failed to load more", { type: "danger" });
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-6">
        <View className="flex-row items-center border-2 border-white mb-8">
          <View className="pl-4">
            <Search size={20} color="#737373" />
          </View>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
            placeholder="Search for themes, colors, or tags..."
            placeholderTextColor="#737373"
            className="flex-1 h-14 px-4 text-white text-sm"
            returnKeyType="search"
          />
        </View>

        <View className="border-l-4 border-white pl-4 mb-8">
          {query ? (
            <>
              <Text className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-1">
                {total} result{total !== 1 ? "s" : ""} for
              </Text>
              <Text className="text-3xl font-bold text-white tracking-tight uppercase">
                "{query}"
              </Text>
            </>
          ) : (
            <Text className="text-3xl font-bold text-white tracking-tight uppercase">Search</Text>
          )}
        </View>

        {!hasSearched ? (
          <View className="items-center justify-center py-24">
            <SearchX size={64} color="#404040" />
            <Text className="text-sm text-neutral-400 mt-6 text-center max-w-xs">
              Enter a keyword above to discover wallpapers.
            </Text>
          </View>
        ) : loading ? (
          <View className="items-center justify-center py-32">
            <RefreshCw size={32} color="#737373" />
          </View>
        ) : wallpapers.length === 0 ? (
          <View className="items-center justify-center py-24">
            <SearchX size={64} color="#404040" />
            <Text className="text-2xl font-bold text-white mt-6">No results found</Text>
            <Text className="text-sm text-neutral-400 mt-2 text-center max-w-xs">
              No wallpapers match "{query}". Try different keywords.
            </Text>
          </View>
        ) : (
          <>
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
                      <View className="flex-row justify-between items-center border-t border-white/20 pt-3">
                        <Text className="text-xs text-white tracking-[0.15em] uppercase">{item.resolution}</Text>
                        <View className="flex-row gap-3">
                          <Heart size={16} color="white" />
                          <Download size={16} color="white" />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {page < totalPages && (
              <View className="items-center py-8">
                <TouchableOpacity onPress={handleLoadMore} className="items-center gap-4 active:opacity-80">
                  <Text className="text-xs text-neutral-400 tracking-[0.2em] uppercase">
                    {loadingMore ? "Loading..." : `Load More (${wallpapers.length} of ${total})`}
                  </Text>
                  <View className="w-12 h-12 rounded-full border border-neutral-700 items-center justify-center">
                    {loadingMore ? (
                      <RefreshCw size={20} color="#737373" />
                    ) : (
                      <ArrowDown size={20} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
