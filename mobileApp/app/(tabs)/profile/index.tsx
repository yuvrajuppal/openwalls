import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Heart, Grid3X3, LayoutList, Settings, LogOut } from "lucide-react-native";
import { router } from "expo-router";
import { useToastNotification } from "../../../utils/toast";
import { useUser } from "../../../context/UserContext";
import { likeService } from "../../../services/like.service";
import { Wallpaper } from "../../../utils/types";

export default function ProfileScreen() {
  const { user, isLoggedIn, isLoading, logout } = useUser();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToastNotification();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            showToast("Logged out successfully", { type: "success" });
          } catch (error) {
            showToast("Failed to logout", { type: "danger" });
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLikedWallpapers();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchLikedWallpapers = async () => {
    setLoading(true);
    try {
      const data = await likeService.getMyLikes(1);
      setWallpapers(data.wallpapers);
    } catch (error) {
      showToast("Failed to load liked wallpapers", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#737373" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-8">
        <Text className="text-2xl font-bold text-white mb-4">Not Logged In</Text>
        <Text className="text-sm text-neutral-400 text-center mb-8">
          Please sign in to view your profile and liked wallpapers.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="px-8 py-3 bg-white active:opacity-80"
        >
          <Text className="text-sm font-semibold text-black uppercase tracking-wider">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-6">
        <View className="flex-row gap-4 mb-8">
          <View className="w-28 h-28 bg-neutral-900 border-2 border-white items-center justify-center">
            <Text className="text-3xl font-bold text-white">
              {user?.username.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-bold text-white tracking-tight uppercase">{user?.username}</Text>
            <Text className="text-xs text-neutral-400 uppercase tracking-widest mt-1">@{user?.username}</Text>
            <Text className="text-sm text-neutral-300 mt-2">Curating the finest wallpapers.</Text>
          </View>
        </View>

        <View className="flex-row gap-3 mb-8">
          <TouchableOpacity className="px-6 py-2.5 bg-white active:opacity-80">
            <Text className="text-sm font-semibold text-black uppercase tracking-wider">Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2.5 border border-neutral-700 active:opacity-80">
            <Settings size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} className="px-6 py-2.5 border border-red-500 active:opacity-80">
            <LogOut size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View className="flex-row border border-neutral-800 mb-8">
          <View className="flex-1 py-6 px-8 items-center border-r border-neutral-800">
            <Text className="text-2xl font-bold text-white">{wallpapers.length}</Text>
            <Text className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Likes</Text>
          </View>
          <View className="flex-1 py-6 px-8 items-center">
            <Text className="text-xl font-bold text-white">{user?.email}</Text>
            <Text className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Email</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center border-b border-neutral-800 pb-4 mb-6">
          <Text className="text-sm text-white uppercase tracking-[0.2em]">Liked Wallpapers</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "opacity-100" : "opacity-50"}`}
            >
              <Grid3X3 size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "opacity-100" : "opacity-50"}`}
            >
              <LayoutList size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <View className="flex-row flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <View key={i} className="w-[48%] mb-4">
                <View className="bg-neutral-900 aspect-[4/5] rounded" />
                <View className="mt-2 h-3 bg-neutral-900 rounded w-2/3" />
                <View className="mt-1 h-2.5 bg-neutral-900 rounded w-1/2" />
              </View>
            ))}
          </View>
        ) : wallpapers.length > 0 ? (
          viewMode === "grid" ? (
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
          ) : (
            <View className="border-t border-neutral-800">
              {wallpapers.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="flex-row items-center gap-4 py-4 border-b border-neutral-800 active:opacity-80 will-change-pressable"
                  onPress={() => router.push({ pathname: "/wallpapers/[id]", params: { id: item.id } })}
                >
                  <View className="w-16 h-16 bg-neutral-900 overflow-hidden">
                    <Image source={{ uri: item.thumbs }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-neutral-400">{item.resolution} • {item.category}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Heart size={14} color="#737373" />
                    <Text className="text-xs text-neutral-400">{item.likecount}</Text>
                  </View>
                  <Text className="text-sm text-neutral-400 uppercase underline">View</Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        ) : (
          <View className="items-center justify-center py-24">
            <Heart size={64} color="#404040" />
            <Text className="text-2xl font-bold text-white mt-6">No liked wallpapers yet</Text>
            <Text className="text-sm text-neutral-400 mt-2 text-center">Like some wallpapers to see them here.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
