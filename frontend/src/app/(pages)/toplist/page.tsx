"use client";

import { TrendingUp, Download, ChevronDown, Zap } from "lucide-react";
import { useState } from "react";

const wallpapers = [
  {
    rank: 1,
    title: "Vortex Concrete",
    resolution: "4K",
    dimensions: "3840 x 2160",
    format: "JPG",
    downloads: "12.4K",
    aspect: "aspect-[4/5]",
    badge: { label: "TRENDING", icon: TrendingUp },
    alt: "A minimalist architectural photography piece showing a brutalist concrete building with sharp angular shadows against a stark white sky.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnHf8W6z2nexCVMl980dFQjurQsiTyhld5aEk04sRuZbuI1fv5ZjLKvQZs0Y7mmdFn3z1ON-8j3xXcWeB-hK4qA3kLqetCeN7sYfP2Cfdw4a6l64EFC93hbDeh4YgjLYsAcdO4BaoFrH__UayhO1jeQDyzj3v8T2as5f2wQQ8lHJyDOxh_IF9jc_UbYVJCHZY2EjAJP4A9rz7_ndmBdfw7--iNGJauekTv4nLVA1hc5l8Kpq6FiSvJHT_0wWgh-F7JyqGn3nzwI1s",
  },
  {
    rank: 2,
    title: "Liquid Carbon",
    resolution: "8K",
    dimensions: "7680 x 4320",
    format: "PNG",
    downloads: "9.8K",
    aspect: "aspect-square",
    alt: "A macro photograph of dark ripples in water, appearing as fluid charcoal silk.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuM_h3BvonvM3KJLmaNPPdLtiEk90CD_mGchLiyMmPQdxe3M9Zr4ZG1pDhr8FNoyCvZK1xa4igzzoyWa0VsotbCTjLYwSsX3HhMZJKxbYFyKIP2jM8BkzBOkCysK5WofWzoAJArN43bVqpXAaX6i9wjKnqnprDlmAIutov4RwLKQJsZ4ZRosW5PSzkz51LXFyqdcyXd0cBuySsG8yNCIf-G8IR0cLp46Q0ZgnwtUPz1Lh5bPyj49RqQ-dvA-R-aGTw7-scbA5rUeI",
  },
  {
    rank: 3,
    title: "Silent Space",
    resolution: "4K",
    dimensions: "3840 x 2160",
    format: "JPG",
    downloads: "8.2K",
    aspect: "aspect-[3/4]",
    alt: "An ultra-minimalist interior shot of a single black designer chair in a vast white hall with soft zenithal lighting.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSPQoraUQTHVGXdW1x7qGUAoVGDgKiT8mvDblj6bTS__ZZI7VNlOipH0T3lH3u6njGJHGXetEFbh-RZduc7gPmPpNIJPBo-YcqQrAA7_tNRCek25dbQm7HTJ6MDhFFjDV-6m5ZsNu-iD9xddBs52a4ICK-_wv5lfz_972S9Zv8NqNX07jYjHqWXcN4echSBhmh4zkNVxcAAu49uR9bGI6kn-HZjiEKXbFTj8lD_UIDPfo4iyh_nm3qCrCUrrPlcCHd1YL1Tvb3XKc",
  },
  {
    rank: 4,
    title: "Signal Loss",
    resolution: "5K",
    dimensions: "5120 x 2880",
    format: "JPG",
    downloads: "7.5K",
    aspect: "aspect-video",
    badge: { label: "HOT", icon: Zap },
    alt: "A technical, glitch-art inspired wallpaper featuring vertical bars of varying grays and whites.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzT4se0OxHJxE3JbuaFAghPM6YZWt2qCakAbowyTS5UXtPOKlXlUVpM1wRAeDtuTM2NQnG0u43U81rEmHTCeqsfOJRFI5YR65tzzJr4YZZJV-uad6MNy1vovs_ZutAkXHj3hGVg7bViortOhPp1GdnnXlwD5sUXFwDiq7tu4UvQkHYS2SCaBA7lztNGRVkbtFGYfiszkHWESuB22pfEDcgxy33aenGDo_gPwqT8Jpf90hOYHvlnrY8gj-IBVvRDZGnECgnVMj06fk",
  },
  {
    rank: 5,
    title: "Misty Pines",
    resolution: "4K",
    dimensions: "3840 x 2160",
    format: "PNG",
    downloads: "6.9K",
    aspect: "aspect-square",
    alt: "A dark forest shrouded in dense white fog with only skeletal silhouettes of tall pine trees visible.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw9FADpxJv1azNzRU2C-jtZLYAZDEf-ukUD5xoF0ozE5rEPxx1BdJ5S4sas0DFEcPp27Ih328VwTMmTFX3CSch96P94BZYLoRoEue7MoXBnuuf9LfSkvrA6OD8LXAFT08qfi_wxC7iPvn0bMAduqqZxxQPkiK7W16baAx_HEMmkh9BcFK-H12ujJp5Bg5tJ2f60wcCb8zBy8l0nRHcmLPNQKZB2L2PI3glH_jBuqoZMv5PXZeriUm4xJxnvpnus1puzHHzb8PR4NQ",
  },
  {
    rank: 6,
    title: "Monolith Desk",
    resolution: "4K",
    dimensions: "3840 x 2160",
    format: "JPG",
    downloads: "5.4K",
    aspect: "aspect-[4/3]",
    alt: "Top-down shot of a minimalist workstation with a high-end mechanical keyboard and mouse on a white desk pad.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlzBwVLvXrSHK6p6Z9K0Uj5txoH-ZKAR0c2_PbK1eJz4Eml6o8OSx48k7sJh8T6Lo90wk_yYJi335tByimHJxyMvSulaCJHAZFsAZthKvsI0jm8cOXTvSVgICnjZ8UPqtY909ZcNEgCGS5hjibGuVWyMj-ojYexKYxG_Q9HyxCTmuV-y-VXGhdAPeksh-BsiMl0zBo2puHtHaf_fiANsXv4BsMpxblxa2i06QEnok-oFlx4MCVW9BR54w-F9mJ5NYpjQFiu5yi7vU",
  },
];

export default function ToplistPage() {
  const [filter, setFilter] = useState<"all" | "30days">("all");

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Header */}
      <section className="mb-16 border-l-4 border-primary pl-6">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2">
          Toplist
        </h1>
        <p className="font-body-md text-body-lg text-secondary max-w-2xl">
          The most popular high-resolution architectural and minimalist
          wallpapers as ranked by the community. Precision-curated excellence.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 font-label-sm text-label-sm tracking-widest uppercase transition-all ${
              filter === "all"
                ? "bg-primary text-on-primary"
                : "border border-primary text-primary hover:bg-primary hover:text-on-primary"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter("30days")}
            className={`px-6 py-2 font-label-sm text-label-sm tracking-widest uppercase transition-all ${
              filter === "30days"
                ? "bg-primary text-on-primary"
                : "border border-primary text-primary hover:bg-primary hover:text-on-primary"
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </section>

      {/* Rankings Grid */}
      <div className="masonry-grid">
        {wallpapers.map((item) => (
          <div
            key={item.rank}
            className="masonry-item group relative cursor-crosshair"
          >
            {/* Rank badge */}
            <div className="absolute top-4 left-4 z-10 font-display-lg text-display-lg-mobile md:text-display-lg text-white drop-shadow-lg flex flex-col mix-blend-difference">
              <span className="font-meta-data text-meta-data tracking-widest uppercase mb-[-8px] opacity-80">
                Rank
              </span>
              #{item.rank}
            </div>

            {/* Badge */}
            {item.badge && (
              <div className="absolute top-4 right-4 z-10 bg-white/90 px-3 py-1 text-black font-label-sm text-label-sm flex items-center gap-2">
                <item.badge.icon className="w-[14px] h-[14px]" />
                {item.badge.label}
              </div>
            )}

            {/* Image */}
            <div
              className={`relative overflow-hidden ${item.aspect} bg-surface-container`}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={item.alt}
                src={item.src}
              />
            </div>

            {/* Info */}
            <div className="mt-4 flex justify-between items-end border-b border-outline-variant pb-4 group-hover:border-primary transition-colors">
              <div>
                <h3 className="font-headline-md text-headline-md uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="font-meta-data text-meta-data text-secondary mt-0.5">
                  {item.resolution} &bull; {item.dimensions} &bull;{" "}
                  {item.format}
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="flex items-center justify-end gap-1 font-label-sm text-label-sm mb-1">
                  <Download className="w-[14px] h-[14px]" />
                  {item.downloads}
                </div>
                <button className="font-label-sm text-label-sm uppercase underline tracking-tighter hover:text-primary transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-24 text-center">
        <button className="group inline-flex flex-col items-center gap-4">
          <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-secondary group-hover:text-primary transition-colors">
            View More Rankings
          </span>
          <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </div>
    </main>
  );
}
