"use client";

import { ArrowRight, Heart, Download, RefreshCw } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { APIROUTES } from "@/utils/APIROUTES";
import { downloadImage } from "@/utils/download";

export default function HomePage() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(APIROUTES.randomWallpapers);
      setWallpapers(data);
    } catch {
      setWallpapers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">

      <div className="flex justify-between items-end mt-10 mb-10 border-b border-outline-variant pb-6">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-2 block">Discover</span>
          <div className="flex items-center gap-3">
            <h3 className="font-display-lg text-headline-md tracking-tighter uppercase">Random Wallpapers</h3>
            <button onClick={fetchRandom} className="p-2 border border-outline-variant hover:border-primary transition-colors active:scale-95">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-2 group" href="/toplist">
          View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {loading ? (
        <section className="flex items-center justify-center py-32">
          <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
        </section>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-32">
          {wallpapers.map((item: any) => (
            <Link key={item.id} href={`/allwallpapers/${item.id}`} className="relative group overlay-target cursor-zoom-in block">
              <div className="bg-surface-container aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover image-zoom" alt={item.id} src={item.thumbs} />
              </div>
              <div className="overlay-content absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
                <div className="mb-4">
                  <span className="font-label-sm text-label-sm text-white bg-white/10 px-2.5 py-1 backdrop-blur-sm">{item.category}</span>
                </div>
                <div className="flex justify-between items-center text-white border-t border-white/20 pt-6">
                  <span className="font-meta-data text-meta-data tracking-[0.15em] uppercase">{item.resolution}</span>
                  <div className="flex gap-6">
                    <Heart className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform fill-none" />
                    <Download
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
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
      )}
    </main>
  );
}
