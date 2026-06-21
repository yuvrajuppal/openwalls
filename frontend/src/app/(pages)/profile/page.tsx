"use client";

import { Download, Heart, Grid3X3, LayoutList, Settings, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import type { RootState } from "@/store/store";

export default function ProfilePage() {
  const router = useRouter();
  const { loginstate, username, useremail } = useSelector((s: RootState) => s.user);
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [wallpapersLoading, setWallpapersLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!loginstate) router.push("/login");
  }, [loginstate, router]);

  useEffect(() => {
    if (!loginstate) return;
    axios
      .get("/api/wallpapers/my-likes", { withCredentials: true })
      .then(({ data }) => setWallpapers(data.wallpapers))
      .catch(() => {})
      .finally(() => setWallpapersLoading(false));
  }, [loginstate]);

  if (!loginstate) {
    return (
      <main className="flex items-center justify-center min-h-[70vh]">
        <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
      </main>
    );
  }

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Profile Hero */}
      <section className="mb-16 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        <div className="shrink-0">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-surface-container border-2 border-primary flex items-center justify-center overflow-hidden">
            <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary select-none">
              {initials}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase">
                {username}
              </h1>
              <p className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mt-1">
                @{username}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary transition-colors active:scale-95">
                Follow
              </button>
              <button className="px-6 py-2.5 border border-outline-variant font-label-sm text-label-sm uppercase tracking-wider hover:border-primary transition-colors active:scale-95">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="font-body-md text-body-lg text-secondary max-w-2xl mb-6 leading-relaxed">
            Curating the finest monochrome and minimalist wallpapers.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-px bg-outline-variant mb-16 border border-outline-variant">
        <div className="bg-background py-6 px-8 flex flex-col items-center text-center">
          <span className="font-display-lg text-headline-md tracking-tighter">
            {wallpapersLoading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : wallpapers.length}
          </span>
          <span className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mt-1">Likes</span>
        </div>
        <div className="bg-background py-6 px-8 flex flex-col items-center text-center">
          <span className="font-display-lg text-headline-md tracking-tighter">{useremail}</span>
          <span className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mt-1">Email</span>
        </div>
      </div>

      {/* Section Header & View Toggle */}
      <div className="flex items-center justify-between mb-10 border-b border-outline-variant pb-4">
        <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary">
          Liked Wallpapers
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid" ? "text-primary" : "text-secondary hover:text-primary"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list" ? "text-primary" : "text-secondary hover:text-primary"
            }`}
          >
            <LayoutList className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Wallpaper Grid */}
      {wallpapersLoading ? (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-surface-container-high aspect-[4/5] rounded-none" />
              <div className="mt-3 space-y-2">
                <div className="h-3 bg-surface-container-high rounded w-2/3" />
                <div className="h-2.5 bg-surface-container-high rounded w-1/2" />
              </div>
            </div>
          ))}
        </section>
      ) : wallpapers.length > 0 ? (
        viewMode === "grid" ? (
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16 animate-fadeIn">
            {wallpapers.map((item: any) => (
              <Link key={item.id} href={`/allwallpapers/${item.id}`} className="relative group overlay-target cursor-pointer block">
                <div className="bg-surface-container aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover image-zoom transition-transform duration-500 group-hover:scale-105"
                    alt={item.id}
                    src={item.thumbs}
                  />
                </div>
                <div className="overlay-content absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-2">
                    <span className="font-label-sm text-label-sm text-white bg-white/10 px-2 py-0.5 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white border-t border-white/20 pt-3">
                    <span className="font-meta-data text-meta-data tracking-[0.15em] uppercase truncate">
                      {item.resolution}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="mb-16 divide-y divide-outline-variant border-t border-outline-variant">
            {wallpapers.map((item: any) => (
              <Link
                key={item.id}
                href={`/allwallpapers/${item.id}`}
                className="flex items-center gap-6 py-5 group hover:bg-surface-container transition-colors px-2 -mx-2"
              >
                <div className="w-16 h-16 bg-surface-container overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.id}
                    src={item.thumbs}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-meta-data text-meta-data text-secondary mt-0.5">
                    {item.resolution} &bull; {item.category}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-6 font-meta-data text-meta-data text-secondary shrink-0">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {item.likecount}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm uppercase underline tracking-tighter text-secondary hover:text-primary transition-colors shrink-0">
                  View
                </span>
              </Link>
            ))}
          </div>
        )
      ) : (
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <Heart className="w-16 h-16 text-outline mb-6" />
          <p className="font-display-lg text-headline-md mb-2">
            No liked wallpapers yet
          </p>
          <p className="font-body-md text-body-lg text-secondary max-w-md">
            Like some wallpapers to see them here.
          </p>
        </section>
      )}
    </main>
  );
}
