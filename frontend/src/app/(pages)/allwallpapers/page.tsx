"use client";

import { Heart, Download, RefreshCw } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { APIROUTES } from "@/utils/APIROUTES";
import { downloadImage } from "@/utils/download";

export default function AllWallpapersPage() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(async (p: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { data } = await axios.get(`${APIROUTES.allWallpapers}?page=${p}`);
      setWallpapers((prev) => (p === 1 ? data.wallpapers : [...prev, ...data.wallpapers]));
      setTotalPages(data.totalPages);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !loadingRef.current) {
          const next = page + 1;
          setPage(next);
          fetchPage(next);
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [page, totalPages, fetchPage]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Header */}
      <section className="mb-16 border-l-4 border-primary pl-6">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2">
          All Wallpapers
        </h1>
        <p className="font-body-md text-body-lg text-secondary max-w-2xl">
          The most popular high-resolution architectural and minimalist
          wallpapers as ranked by the community. Precision-curated excellence.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16">
        {wallpapers.map((item: any) => (
          <Link key={item.id} href={`/allwallpapers/${item.id}`} className="relative group overlay-target cursor-zoom-in block">
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
                <div className="flex gap-3 shrink-0">
                  <Heart className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform fill-none" />
                  <Download
                    className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      downloadImage(item.imagelink, `wallpaper-${item.id}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="flex justify-center py-12">
        {loading && page > 1 && (
          <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
        )}
      </div>
    </main>
  );
}
