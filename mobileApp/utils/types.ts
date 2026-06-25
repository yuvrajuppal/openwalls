export interface User {
  uiid: string;
  username: string;
  email: string;
}

export interface Wallpaper {
  id: string;
  thumbs: string;
  imagelink: string;
  category: string;
  resolution: string;
  file_size: string;
  file_type: string;
  dimension_x: number;
  dimension_y: number;
  likecount: number;
  createdAt: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface PaginatedResponse<T> {
  wallpapers: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
