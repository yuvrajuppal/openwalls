import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ArrowLeft, Heart, Download, RefreshCw } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Paths, File } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useToastNotification } from "../../utils/toast";
import { useUser } from "../../context/UserContext";
import { wallpaperService } from "../../services/wallpaper.service";
import { likeService } from "../../services/like.service";
import { Wallpaper } from "../../utils/types";

function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
  return `${bytes} B`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center gap-4">
      <Text className="text-xs text-neutral-400 uppercase tracking-widest">{label}</Text>
      <Text className="text-sm text-white text-right">{value}</Text>
    </View>
  );
}

export default function WallpaperDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isLoggedIn } = useUser();
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [isliked, setIsliked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const showToast = useToastNotification();

  useEffect(() => {
    if (id) {
      fetchWallpaper();
    }
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && id) {
      checkLikeStatus();
    }
  }, [isLoggedIn, id]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (downloading) {
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 300);
    } else {
      setDownloadProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [downloading]);

  const fetchWallpaper = async () => {
    setLoading(true);
    try {
      const data = await wallpaperService.getById(id!);
      setWallpaper(data);
    } catch (error) {
      showToast("Failed to load wallpaper", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const liked = await likeService.checkLike(id!);
      setIsliked(liked);
    } catch (error) {
      // Silently fail
    }
  };

  const toggleLike = async () => {
    if (!isLoggedIn) {
      showToast("Please sign in to like wallpapers", { type: "warning" });
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      if (isliked) {
        await likeService.unlike(id!);
        setIsliked(false);
        if (wallpaper) {
          setWallpaper({ ...wallpaper, likecount: wallpaper.likecount - 1 });
        }
        showToast("Unliked", { type: "success" });
      } else {
        await likeService.like(id!);
        setIsliked(true);
        if (wallpaper) {
          setWallpaper({ ...wallpaper, likecount: wallpaper.likecount + 1 });
        }
        showToast("Liked!", { type: "success" });
      }
    } catch (error) {
      showToast("Failed to update like", { type: "danger" });
    } finally {
      setLikeLoading(false);
    }
  };

  const downloadWallpaper = async () => {
    if (!wallpaper || downloading) return;
    
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your media library to download wallpapers.",
          [{ text: "OK" }]
        );
        return;
      }

      setDownloading(true);
      setDownloadProgress(0);
      
      const extension = wallpaper.file_type.split("/")[1] || "jpg";
      const filename = `wallpaper-${wallpaper.id}.${extension}`;
      const file = new File(Paths.cache, filename);
      
      const downloadedFile = await File.downloadFileAsync(wallpaper.imagelink, file);
      
      setDownloadProgress(100);
      await MediaLibrary.createAssetAsync(downloadedFile.uri);
      showToast("Wallpaper downloaded successfully!", { type: "success" });
    } catch (error) {
      console.error("Download error:", error);
      showToast("Failed to download wallpaper", { type: "danger" });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <RefreshCw size={32} color="#737373" />
      </View>
    );
  }

  if (!wallpaper) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-8">
        <Text className="text-2xl font-bold text-white mb-4">Wallpaper not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 border border-white active:opacity-80">
          <Text className="text-sm text-white uppercase">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-6">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2 mb-8">
          <ArrowLeft size={16} color="#737373" />
          <Text className="text-sm text-neutral-400">Back</Text>
        </TouchableOpacity>

        <View className="gap-8">
          <View className="bg-neutral-900 border border-neutral-800 overflow-hidden">
            <Image
              source={{ uri: wallpaper.imagelink }}
              className="w-full aspect-[4/5]"
              resizeMode="contain"
            />
          </View>

          <View className="border border-neutral-800">
            <View className="px-6 py-5 border-b border-neutral-800">
              <Text className="text-xs text-neutral-400 uppercase tracking-widest mb-1">ID</Text>
              <Text className="text-2xl font-bold text-white uppercase tracking-tight">{wallpaper.id}</Text>
            </View>

            <View className="px-6 py-5 gap-4 border-b border-neutral-800">
              <InfoRow label="Category" value={wallpaper.category} />
              <InfoRow label="Resolution" value={wallpaper.resolution} />
              <InfoRow label="File Size" value={formatFileSize(parseInt(wallpaper.file_size))} />
              <InfoRow label="File Type" value={wallpaper.file_type} />
              <InfoRow label="Dimensions" value={`${wallpaper.dimension_x} x ${wallpaper.dimension_y} px`} />
              <InfoRow label="Likes" value={wallpaper.likecount.toString()} />
              <InfoRow label="Created" value={new Date(wallpaper.createdAt).toLocaleDateString()} />
            </View>

            <View className="px-6 py-5 flex-row gap-4">
              <TouchableOpacity
                onPress={downloadWallpaper}
                disabled={downloading}
                className="flex-1 flex-row items-center justify-center gap-2 h-12 bg-white active:opacity-80"
              >
                {downloading ? (
                  <RefreshCw size={16} color="black" />
                ) : (
                  <Download size={16} color="black" />
                )}
                <Text className="text-sm font-semibold text-black uppercase tracking-wider">
                  {downloading ? `${downloadProgress}%` : "Download"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleLike}
                disabled={likeLoading}
                className={`items-center justify-center h-12 px-5 border active:opacity-80 ${
                  isliked ? "bg-white border-white" : "border-neutral-700"
                }`}
              >
                {likeLoading ? (
                  <RefreshCw size={16} color={isliked ? "black" : "white"} />
                ) : (
                  <Heart size={16} color={isliked ? "black" : "white"} fill={isliked ? "black" : "transparent"} />
                )}
              </TouchableOpacity>
            </View>
            
            {downloading && (
              <View className="px-6 pb-5">
                <View className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
