# OpenWalls

> Curated, high-resolution minimalist wallpapers for the modern interface.

OpenWalls is a wallpaper discovery and curation platform focused on high-resolution minimalist and monochrome content. Built with a modern design system and aimed at designers, developers, and wallpaper enthusiasts.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend:** Node.js, Express 5
- **Design:** Monochrome Material 3-inspired palette, Geist / Inter / JetBrains Mono typography
- **Data:** Wallhaven API (planned)

## Features

- Minimalist, content-first gallery experience
- Responsive masonry grid layout
- Category-based browsing (Minimalism, Cyberpunk, Landscape, etc.)
- Search and filter by themes, colors, and tags
- Creator submission workflow

## Status

**Under development.** Core UI components and design system are in place. Backend API routes and full page implementations are pending.

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
npm run start
```

## Project Structure

```
openwalls/
├── frontend/          # Next.js 16 application
│   └── src/
│       ├── app/       # Pages and layouts
│       └── components/# Reusable UI components
├── backend/           # Express API server
│   └── src/
│       ├── routes/    # API route definitions
│       └── controller/# Route handlers
└── html/              # Static HTML prototypes
```
