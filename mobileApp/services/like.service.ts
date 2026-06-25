import { api } from "../utils/api";
import { Wallpaper, PaginatedResponse } from "../utils/types";

export const likeService = {
  async like(wallpaperId: string): Promise<void> {
    await api.post(`/api/wallpapers/${wallpaperId}/like`);
  },

  async unlike(wallpaperId: string): Promise<void> {
    await api.post(`/api/wallpapers/${wallpaperId}/unlike`);
  },

  async checkLike(wallpaperId: string): Promise<boolean> {
    const response = await api.get(`/api/wallpapers/${wallpaperId}/checklike`);
    return response.data.liked;
  },

  async getMyLikes(page: number = 1): Promise<PaginatedResponse<Wallpaper>> {
    const response = await api.get("/api/wallpapers/my-likes", { params: { page } });
    return response.data;
  },
};
