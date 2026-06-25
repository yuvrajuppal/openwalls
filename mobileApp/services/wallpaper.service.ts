import { api } from "../utils/api";
import { Wallpaper, Category, PaginatedResponse } from "../utils/types";

export const wallpaperService = {
  async getAll(page: number = 1): Promise<PaginatedResponse<Wallpaper>> {
    const response = await api.get("/api/wallpapers", { params: { page } });
    return response.data;
  },

  async getRandom(): Promise<Wallpaper[]> {
    const response = await api.get("/api/wallpapers/random");
    return response.data;
  },

  async search(query: string, page: number = 1): Promise<PaginatedResponse<Wallpaper>> {
    const response = await api.get("/api/wallpapers/search", { params: { q: query, page } });
    return response.data;
  },

  async getById(id: string): Promise<Wallpaper> {
    const response = await api.get(`/api/wallpapers/${id}`);
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get("/api/wallpapers/categories");
    return response.data;
  },
};
