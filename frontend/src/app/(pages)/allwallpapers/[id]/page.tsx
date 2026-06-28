import type { Metadata } from "next";
import WallpaperDetailClient from "./WallpaperDetailClient";

async function getWallpaper(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/wallpapers/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const wallpaper = await getWallpaper(id);

  if (!wallpaper) {
    return { title: "Wallpaper Not Found" };
  }

  return {
    title: `${wallpaper.id} - ${wallpaper.category} wallpaper`,
    description: `${wallpaper.category} wallpaper in ${wallpaper.resolution}. Download high-resolution ${wallpaper.file_type.replace("image/", "")} wallpaper.`,
    openGraph: {
      title: `${wallpaper.id} - ${wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1)} Wallpaper`,
      description: `${wallpaper.category} wallpaper in ${wallpaper.resolution}.`,
      images: [
        {
          url: wallpaper.thumbs,
          width: wallpaper.dimension_x,
          height: wallpaper.dimension_y,
          alt: `${wallpaper.category} wallpaper ${wallpaper.resolution}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${wallpaper.id} - ${wallpaper.category} wallpaper`,
      description: `${wallpaper.category} wallpaper in ${wallpaper.resolution}.`,
      images: [wallpaper.thumbs],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WallpaperDetailClient id={id} />;
}
