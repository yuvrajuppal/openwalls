# OpenWalls

> Curated, high-resolution minimalist wallpapers for the modern interface.

OpenWalls is a wallpaper discovery and curation platform focused on high-resolution minimalist and monochrome content. Built with a modern design system and aimed at designers, developers, and wallpaper enthusiasts.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Redux Toolkit, Axios, Lucide React
- **Backend:** Node.js, Express 5, Prisma 7 (MySQL/MariaDB), JWT, bcryptjs
- **Design:** Monochrome Material 3-inspired palette, Geist / Inter / JetBrains Mono typography
- **Data:** Wallhaven API

## Features

- Minimalist, content-first gallery experience
- Responsive masonry grid layout with hover overlays + skeleton loading
- Full authentication system (JWT + httpOnly cookies + Redux state)
- Like/unlike wallpapers with persistent storage
- Brutalist-styled auth pages with real-time validation
- Search with API-backed results and infinite scroll
- Random wallpaper endpoint (24 random picks per call)
- Paginated + scrollable wallpaper listing
- Category aggregation endpoint
- Skeleton loading screens + smooth fade-in animations
- Route-based scroll-to-top
- Next.js API route handlers (backend URL hidden from client)
- Image download utility

## Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Complete |
| Categories | `/category` | Complete |
| Login | `/login` | Complete |
| Sign Up | `/signup` | Complete |
| Search | `/search` | Complete |
| All Wallpapers | `/allwallpapers` | Complete |
| Wallpaper Detail | `/allwallpapers/[id]` | Complete |
| Profile | `/profile` | Complete |

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/userRoutes/signup` | Register a new user |
| POST | `/userRoutes/login` | Sign in (sets httpOnly cookie) |
| POST | `/userRoutes/logout` | Clear auth cookie |
| GET | `/userRoutes/checkislogin` | Check session via cookie |

### Wallpapers
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/wallpapers?page=1` | Paginated list (24 per page) |
| GET | `/api/wallpapers/random` | 24 random wallpapers |
| GET | `/api/wallpapers/categories` | Category list with counts |
| GET | `/api/wallpapers/search?q=term` | Search by id, category, resolution |
| GET | `/api/wallpapers/:id` | Single wallpaper detail |
| POST | `/api/wallpapers/:id/like` | Like a wallpaper (auth required) |
| POST | `/api/wallpapers/:id/unlike` | Unlike a wallpaper (auth required) |

All frontend calls go through Next.js API route handlers — backend URL is never exposed to the client.

## Status

**Active development.** All core features implemented — auth, wallpaper browsing, search, likes, and user profiles.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at [http://localhost:3001](http://localhost:3001).

### Backend

```bash
cd backend
npm install
npm run dev
```

API runs on port 3000.

### Backend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Starts with nodemon + swagger auto-gen |
| `pgen` | `npm run pgen` | Regenerates Prisma client |
| `mig` | `npm run mig -- <name>` | Creates a new Prisma migration |
| `dbpull` | `npm run dbpull` | Pulls schema from existing database |
| `dbpush` | `npm run dbpush` | Pushes Prisma schema to database |
| `build` | `npm run build` | Bundles server with esbuild |

### .env Setup

Create `backend/.env`:

```env
SERVERPORT = 3000
DATABASE_URL="mysql://root@localhost:3306/openwallsdb"
JWT_SECRET="your-secret-key-here"
```

### Database

```bash
cd backend
npx prisma db push   # Push schema to MySQL
npx prisma generate  # Regenerate Prisma client
node data.js         # Fetch and seed wallpapers from Wallhaven API
```

## Project Structure

```
openwalls/
├── frontend/          # Next.js 16 application
│   └── src/
│       ├── app/
│       │   ├── (pages)/
│       │   │   ├── (homepage)/   # Home with random wallpaper grid
│       │   │   ├── category/     # Category listing from API
│       │   │   ├── login/        # Sign in with Redux dispatch
│       │   │   ├── signup/       # Create account with Redux dispatch
│       │   │   ├── search/       # API-backed search results
│       │   │   ├── allwallpapers/# Full listing with infinite scroll
│       │   │   ├── allwallpapers/[id]/  # Wallpaper detail page
│       │   │   └── profile/      # User profile (auth guarded)
│       │   ├── api/
│       │   │   ├── auth/         # Route handlers (login, signup, logout, check)
│       │   │   └── wallpapers/   # Route handler proxy (catch-all)
│       │   ├── globals.css       # Theme tokens + utilities
│       │   └── layout.tsx        # Root layout with Redux provider
│       ├── components/           # Navbar, Footer, LoadingScreen, ScrollToTop
│       ├── store/                # Redux store, provider, user slice, AuthInitializer
│       └── utils/                # APIROUTES, download, baseurl, production
├── backend/           # Express API server
│   ├── prisma/
│   │   └── schema/               # users, wallpapers, wallpaperslikes
│   ├── generated/prisma/         # Generated Prisma client
│   └── src/
│       ├── config/               # Prisma client + MariaDB adapter
│       ├── middleware/           # JWT authentication middleware
│       ├── controller/           # Auth, wallpapers, likes controllers
│       ├── routes/               # Express route definitions
│       ├── app.js                # Express app setup + CORS
│       └── server.js             # Entry point
├── data.js            # Wallhaven API data ingestion script
```
