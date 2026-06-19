"use client";

import { Download, Heart, Grid3X3, LayoutList, Settings, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

const wallpapers = [
  { id: 9, title: "Signal Loss", aspect: "aspect-video", tag: "Cyberpunk", resolution: "5120 x 2880", downloads: "7.5K", likes: 567, alt: "Glitch art vertical bars", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzT4se0OxHJxE3JbuaFAghPM6YZWt2qCakAbowyTS5UXtPOKlXlUVpM1wRAeDtuTM2NQnG0u43U81rEmHTCeqsfOJRFI5YR65tzzJr4YZZJV-uad6MNy1vovs_ZutAkXHj3hGVg7bViortOhPp1GdnnXlwD5sUXFwDiq7tu4UvQkHYS2SCaBA7lztNGRVkbtFGYfiszkHWESuB22pfEDcgxy33aenGDo_gPwqT8Jpf90hOYHvlnrY8gj-IBVvRDZGnECgnVMj06fk" },
  { id: 10, title: "Misty Pines", aspect: "aspect-square", tag: "Nature", resolution: "3840 x 2160", downloads: "6.9K", likes: 489, alt: "Dark forest in fog", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw9FADpxJv1azNzRU2C-jtZLYAZDEf-ukUD5xoF0ozE5rEPxx1BdJ5S4sas0DFEcPp27Ih328VwTMmTFX3CSch96P94BZYLoRoEue7MoXBnuuf9LfSkvrA6OD8LXAFT08qfi_wxC7iPvn0bMAduqqZxxQPkiK7W16baAx_HEMmkh9BcFK-H12ujJp5Bg5tJ2f60wcCb8zBy8l0nRHcmLPNQKZB2L2PI3glH_jBuqoZMv5PXZeriUm4xJxnvpnus1puzHHzb8PR4NQ" },
  { id: 11, title: "Monolith Desk", aspect: "aspect-[4/3]", tag: "Industrial", resolution: "3840 x 2160", downloads: "5.4K", likes: 412, alt: "Minimalist workstation setup", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlzBwVLvXrSHK6p6Z9K0Uj5txoH-ZKAR0c2_PbK1eJz4Eml6o8OSx48k7sJh8T6Lo90wk_yYJi335tByimHJxyMvSulaCJHAZFsAZthKvsI0jm8cOXTvSVgICnjZ8UPqtY909ZcNEgCGS5hjibGuVWyMj-ojYexKYxG_Q9HyxCTmuV-y-VXGhdAPeksh-BsiMl0zBo2puHtHaf_fiANsXv4BsMpxblxa2i06QEnok-oFlx4MCVW9BR54w-F9mJ5NYpjQFiu5yi7vU" },
  { id: 12, title: "Liquid Carbon", aspect: "aspect-square", tag: "Abstract", resolution: "7680 x 4320", downloads: "9.8K", likes: 876, alt: "Dark ripples in water", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuM_h3BvonvM3KJLmaNPPdLtiEk90CD_mGchLiyMmPQdxe3M9Zr4ZG1pDhr8FNoyCvZK1xa4igzzoyWa0VsotbCTjLYwSsX3HhMZJKxbYFyKIP2jM8BkzBOkCysK5WofWzoAJArN43bVqpXAaX6i9wjKnqnprDlmAIutov4RwLKQJsZ4ZRosW5PSzkz51LXFyqdcyXd0cBuySsG8yNCIf-G8IR0cLp46Q0ZgnwtUPz1Lh5bPyj49RqQ-dvA-R-aGTw7-scbA5rUeI" },
  { id: 13, title: "Silent Space", aspect: "aspect-[3/4]", tag: "Minimalism", resolution: "3840 x 2160", downloads: "8.2K", likes: 645, alt: "Black chair in white hall", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSPQoraUQTHVGXdW1x7qGUAoVGDgKiT8mvDblj6bTS__ZZI7VNlOipH0T3lH3u6njGJHGXetEFbh-RZduc7gPmPpNIJPBo-YcqQrAA7_tNRCek25dbQm7HTJ6MDhFFjDV-6m5ZsNu-iD9xddBs52a4ICK-_wv5lfz_972S9Zv8NqNX07jYjHqWXcN4echSBhmh4zkNVxcAAu49uR9bGI6kn-HZjiEKXbFTj8lD_UIDPfo4iyh_nm3qCrCUrrPlcCHd1YL1Tvb3XKc" },
  { id: 14, title: "Cyber Alley", aspect: "aspect-[9/16]", tag: "Cyberpunk", resolution: "2160 x 3840", downloads: "11.2K", likes: 934, alt: "Rainy neon alleyway", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7XpGeet1ghBQxGhCr4eghqIKMgtMfmmXtmxBJ2lmOimBut_fvLI84sCau8yACaprYvXZru2kLnRKv1KB2PRpISn1i7JQ0dmxtkJ1a8T3Pa2RlfXtn4IOgRgNPad-4DocQV2s3idGeo39q7evlVo4ES6LCoKK8oQq0Xly7Fp2bvQyQgcjfmQWuvJMXjtPgbE4Lkxd2skBA-usVEe209sU_EX2_LprbQOeeEdSpvl13vNrgm-0tlk4LnrPpR1ZCKxjjcOBT4x_PqRw" },
];

export default function ProfilePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const stats = [
    { label: "Likes", value: wallpapers.length.toString() },
    { label: "Total Downloads", value: "49.7K" },
    { label: "Joined", value: "2024" },
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Profile Hero */}
      <section className="mb-16 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        <div className="shrink-0">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-surface-container border-2 border-primary flex items-center justify-center overflow-hidden">
            <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary select-none">
              YD
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase">
                Yuvraj Dhamija
              </h1>
              <p className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mt-1">
                @yuvrajuppal
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
            Architecture enthusiast and digital artist exploring the
            intersection of geometry and light.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2 font-meta-data text-meta-data text-secondary">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              India
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Joined 2024
            </span>
            <span className="flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5" />
              <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">
                openwalls.app/yuvrajuppal
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-px bg-outline-variant mb-16 border border-outline-variant">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-background py-6 px-8 flex flex-col items-center text-center"
          >
            <span className="font-display-lg text-headline-md tracking-tighter">
              {stat.value}
            </span>
            <span className="font-meta-data text-meta-data text-secondary uppercase tracking-widest mt-1">
              {stat.label}
            </span>
          </div>
        ))}
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
      {wallpapers.length > 0 ? (
        viewMode === "grid" ? (
          <section className="masonry-grid mb-16">
            {wallpapers.map((item) => (
              <div
                key={item.id}
                className="masonry-item relative group overlay-target cursor-zoom-in"
              >
                <div
                  className={`bg-surface-container ${item.aspect} overflow-hidden`}
                >
                  <img
                    className="w-full h-full object-cover image-zoom"
                    alt={item.alt}
                    src={item.src}
                  />
                </div>
                <div className="overlay-content absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
                  <div className="mb-4">
                    <span className="font-label-sm text-label-sm text-white bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white border-t border-white/20 pt-6">
                    <span className="font-meta-data text-meta-data tracking-[0.15em] uppercase">
                      {item.resolution}
                    </span>
                    <div className="flex gap-6">
                      <Heart className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                      <Download className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="mb-16 divide-y divide-outline-variant border-t border-outline-variant">
            {wallpapers.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 py-5 group hover:bg-surface-container transition-colors px-2 -mx-2"
              >
                <div className="w-16 h-16 bg-surface-container overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.alt}
                    src={item.src}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-tight truncate">
                    {item.title}
                  </h3>
                  <p className="font-meta-data text-meta-data text-secondary mt-0.5">
                    {item.resolution} &bull; {item.tag}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-6 font-meta-data text-meta-data text-secondary shrink-0">
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {item.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {item.likes}
                  </span>
                </div>
                <button className="font-label-sm text-label-sm uppercase underline tracking-tighter text-secondary hover:text-primary transition-colors shrink-0">
                  Download
                </button>
              </div>
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
