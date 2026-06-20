# OpenWalls

> Curated, high-resolution minimalist wallpapers for the modern interface.

OpenWalls is a wallpaper discovery and curation platform focused on high-resolution minimalist and monochrome content. Built with a modern design system and aimed at designers, developers, and wallpaper enthusiasts.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend:** Node.js, Express 5, Prisma 7 (MySQL/MariaDB)
- **Design:** Monochrome Material 3-inspired palette, Geist / Inter / JetBrains Mono typography
- **Data:** Wallhaven API

## Features

- Minimalist, content-first gallery experience
- Responsive masonry grid layout with hover overlays
- Category-based browsing (Minimalism, Cyberpunk, Landscape, etc.)
- Search and filter by themes, colors, and tags
- Brutalist-styled login and signup pages (with JWT auth)
- Sticky navigation bar with active route highlighting
- Footer with legal and social links
- Random wallpaper endpoint (24 random picks per call)
- Paginated wallpaper listing API
- Category aggregation endpoint

## Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Complete |
| Categories | `/category` | Complete |
| Login | `/login` | Complete |
| Sign Up | `/signup` | Complete |
| Search | `/search` | Complete |
| Toplist | `/toplist` | Complete |
| Profile | `/profile` | Complete |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/userRoutes/signup` | Register a new user |
| POST | `/userRoutes/login` | Sign in and receive JWT |
| GET | `/api/wallpapers?page=1` | Paginated wallpaper list (24 per page) |
| GET | `/api/wallpapers/random` | 24 random wallpapers |
| GET | `/api/wallpapers/categories` | Category list with counts |

## Status

**Under development.** Frontend is complete with 7 pages. Backend has auth and wallpaper APIs with Prisma ORM connected to MySQL/MariaDB.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd backend
npm install
npm run dev
```

The API runs on port 3000 (configured in `.env`).

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
│       │   │   ├── (homepage)/   # Home page with masonry grid
│       │   │   ├── category/     # Category listing
│       │   │   ├── login/        # Sign in page
│       │   │   ├── signup/       # Create account page
│       │   │   ├── search/       # Search results
│       │   │   ├── toplist/      # Top ranked wallpapers
│       │   │   └── profile/      # User profile with liked wallpapers
│       │   ├── globals.css       # Theme tokens and utilities
│       │   └── layout.tsx        # Root layout
│       ├── components/           # Navbar, Footer
│       └── utils/                # Helpers
├── backend/           # Express API server
│   ├── prisma/
│   │   └── schema/               # Prisma schema files (users, wallpapers)
│   ├── generated/prisma/         # Generated Prisma client
│   └── src/
│       ├── config/               # DB config (Prisma client)
│       ├── controller/           # Route handlers (auth, wallpapers)
│       ├── routes/               # Express route definitions
│       ├── app.js                # Express app setup
│       └── server.js             # Entry point
├── data.js            # Wallhaven API data ingestion script
└── html/              # Static HTML prototypes
```
