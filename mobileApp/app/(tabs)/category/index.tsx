import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { RefreshCw } from "lucide-react-native";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { wallpaperService } from "../../../services/wallpaper.service";
import { Category } from "../../../utils/types";

const CATEGORY_IMAGES: Record<string, string> = {
  general: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKcVq1rc6USvreXYTDJds88z2h18lgAPj012a_FR5W3z-Ci-WdS4oVdxTpPjveh8tce-VVsWTT4CO5XbWlT_NOuPY7NMjRLz9bEo3mn27_wLyrJXcNjx0YiIrysDZiw1KaUTfdxjD0rcqYyVuTOCvmowUbHB8ePGG1rTUpeuO2hrhHo0kjjBJfnxwkJQCH5Ve8QvzTDUY3tTOGJrOcO3PZ6pEeHm_XmI-c09JLkOP56EPLtrotaXDE-WC6tjoXU9S5Vm2s-lyfDA",
  anime: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEoqEv_KQWoenAxPSE0AI6ER6oQjN5wCPKxl8Y2jwIRbh_--sNcZf1U3NEVw2sfKNoekTYX3Jhlhdoan8rioH_0EdBhW0SHeOoUDDVqJdUi1cABc22qTfbn4K1_vdBuksNWLAQ1I04I4JE3xsyLGj7UncnxLPUybRktj89ZhzggJb2a0rtH7WjA0LJitInclNFMlRJ1ztqXJMvqlWnE36eGVZuj3jPjC1EwzcVnaBYirozjvJ2Z51P1vrQxGDU5mMQ5VRug4q1ezU",
};

export default function CategoryScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await wallpaperService.getCategories();
      setCategories(data);
    } catch (error) {
      toast.show("Failed to load categories", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (categoryName: string) => {
    router.push({ pathname: "/(tabs)/search", params: { q: categoryName } });
  };

  const getCategoryImage = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase();
    return CATEGORY_IMAGES[normalizedName] || "";
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 pt-8 pb-6">
        <View className="border-l-4 border-white pl-4 mb-8">
          <Text className="text-3xl font-bold text-white tracking-tight mb-2">Categories</Text>
          <Text className="text-xs text-neutral-400 uppercase tracking-widest">
            Curated visual taxonomies for digital surfaces
          </Text>
        </View>

        {loading ? (
          <View className="gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <View key={i} className="h-64 bg-neutral-900" />
            ))}
          </View>
        ) : (
          <View className="gap-4">
            {categories.map((cat) => {
              const imageUrl = getCategoryImage(cat.name);
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => handleCategoryPress(cat.name)}
                  className="h-64 relative overflow-hidden active:opacity-80"
                  style={{ backgroundColor: imageUrl ? undefined : "#1a1c1c" }}
                >
                  {imageUrl && (
                    <Image
                      source={{ uri: imageUrl }}
                      className="absolute inset-0 w-full h-full"
                      resizeMode="cover"
                    />
                  )}
                  <View className="absolute inset-0 bg-black/20" />
                  <View className="absolute inset-0 items-center justify-center px-6">
                    <Text className="text-2xl font-bold text-white tracking-tight uppercase mb-2">{cat.name}</Text>
                    <Text className="text-xs text-white/80 bg-black/40 px-3 py-1">
                      {cat.count.toLocaleString()} WALLPAPERS
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
