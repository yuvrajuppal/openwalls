# Mobile App API Integration

## Overview
The mobile app is now fully integrated with the backend API. All screens use real data instead of demo data.

## Architecture

### API Configuration (`utils/api.ts`)
- Axios instance with configurable base URL
- Request interceptor: Adds Bearer token from AsyncStorage
- Response interceptor: Handles 401 errors by clearing token
- Base URL configured in `config.ts`

### Authentication (`context/UserContext.tsx`)
- React Context for global auth state
- Token storage using AsyncStorage
- Methods: login, signup, logout, checkAuth, refreshAuth
- Provides `user`, `isLoggedIn`, `isLoading` state

### API Services
- **auth.service.ts**: User authentication (signup, login, logout, checkAuth)
- **wallpaper.service.ts**: Wallpaper operations (getAll, getRandom, search, getById, getCategories)
- **like.service.ts**: Like operations (like, unlike, checkLike, getMyLikes)

## Screens Updated

### Home Screen
- Fetches random wallpapers from API
- Refresh button reloads data
- Tapping wallpaper navigates to detail page

### Wallpapers Screen
- Fetches all wallpapers with pagination
- "Load More" button fetches next page
- Shows loading skeletons while fetching

### Search Screen
- Real-time search with API
- Pagination support
- Shows result count and query

### Categories Screen
- Fetches categories from API
- Tapping category navigates to search with filter

### Profile Screen
- Shows user info from auth context
- Fetches user's liked wallpapers
- Grid/List view toggle
- Logout button with confirmation
- Shows login prompt if not authenticated

### Login Screen
- Real authentication with API
- Stores token in AsyncStorage
- Error handling with toast notifications
- Redirects to signup

### Signup Screen
- Real registration with API
- Password validation
- Stores token in AsyncStorage
- Error handling with toast notifications

### Wallpaper Detail Screen
- Fetches wallpaper by ID
- Shows full metadata (category, resolution, file size, etc.)
- Like/Unlike functionality (requires auth)
- Like count updates in real-time
- Shows login prompt if not authenticated

## Configuration

### API Base URL (`config.ts`)
```typescript
export const config = {
  API_BASE_URL: __DEV__ ? "http://10.0.2.2:3000" : "https://your-production-api.com",
};
```

**For Android Emulator:** Use `http://10.0.2.2:3000`
**For iOS Simulator:** Use `http://localhost:3000`
**For Physical Device:** Use your machine's IP address (e.g., `http://192.168.1.100:3000`)

## Authentication Flow

1. User logs in/signs up
2. Backend returns JWT token
3. Token stored in AsyncStorage
4. All subsequent requests include token in Authorization header
5. On app start, token is validated via checkAuth endpoint
6. On 401 error, token is automatically cleared

## Error Handling

- Network errors: Toast notifications
- Validation errors: Inline error messages
- Auth errors: Automatic token clearing
- Loading states: Skeleton screens and spinners

## Dependencies Added

- `axios`: HTTP client
- `@react-native-async-storage/async-storage`: Token storage
- `react-native-toast-notifications`: Toast notifications

## API Endpoints Used

### Authentication
- `POST /userRoutes/signup`
- `POST /userRoutes/login`
- `POST /userRoutes/logout`
- `GET /userRoutes/checkislogin`

### Wallpapers
- `GET /api/wallpapers` (paginated)
- `GET /api/wallpapers/random`
- `GET /api/wallpapers/search`
- `GET /api/wallpapers/:id`
- `GET /api/wallpapers/categories`

### Likes
- `POST /api/wallpapers/:id/like`
- `POST /api/wallpapers/:id/unlike`
- `GET /api/wallpapers/:id/checklike`
- `GET /api/wallpapers/my-likes`

## Testing

To test the API integration:

1. Start the backend server: `cd backend && npm start`
2. Update `config.ts` with correct API URL for your device/emulator
3. Start the mobile app: `cd mobileApp && npx expo start`
4. Test each screen:
   - Home: Should show random wallpapers
   - Wallpapers: Should show all wallpapers with pagination
   - Search: Should search and filter wallpapers
   - Categories: Should show categories from database
   - Login/Signup: Should authenticate and store token
   - Profile: Should show liked wallpapers (when logged in)
   - Wallpaper Detail: Should show full info and allow liking

## Notes

- All API calls use Bearer token authentication (not cookies)
- Tokens are stored securely in AsyncStorage
- 401 errors automatically clear the token
- Loading states are shown for all async operations
- Error messages are displayed via toast notifications
- Offline support is not implemented (requires network)
