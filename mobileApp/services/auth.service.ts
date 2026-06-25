import { api } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse, User } from "../utils/types";

export const authService = {
  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/userRoutes/signup", { username, email, password });
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/userRoutes/login", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/userRoutes/logout");
    await AsyncStorage.removeItem("token");
  },

  async checkAuth(): Promise<{ islogin: boolean; user?: User }> {
    try {
      const response = await api.get("/userRoutes/checkislogin");
      return response.data;
    } catch {
      return { islogin: false };
    }
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem("token");
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem("token");
    return !!token;
  },
};
