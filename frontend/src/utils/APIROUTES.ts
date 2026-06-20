export const APIROUTES = {
  randomWallpapers: "/api/wallpapers/random",
  allWallpapers: "/api/wallpapers",
  wallpapersCategories: "/api/wallpapers/categories",
  searchWallpapers: "/api/wallpapers/search",
  wallpaperById: (id: string) => `/api/wallpapers/${id}`,
};
