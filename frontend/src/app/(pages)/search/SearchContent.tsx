"use client";

import { Search, ArrowRight, Heart, Download, SearchX, RefreshCw } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { APIROUTES } from "@/utils/APIROUTES";
import { downloadImage } from "@/utils/download";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [searchFocused, setSearchFocused] = useState(false);
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const fetchResults = useCallback(
    async (q: string, p: number, append: boolean) => {
      if (!q.trim()) return;
      if (!append) setInitialLoading(true);
      else setLoading(true);

      try {
        const { data } = await axios.get(`${APIROUTES.searchWallpapers}?q=${encodeURIComponent(q)}&page=${p}`);
        setWallpapers((prev) => (append ? [...prev, ...data.wallpapers] : data.wallpapers));
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch {
        if (!append) setWallpapers([]);
        setTotal(0);
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (query.trim()) {
      setPage(1);
      fetchResults(query, 1, false);
    } else {
      setWallpapers([]);
      setTotal(0);
    }
  }, [query, fetchResults]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchInput.trim();
      if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [searchInput, router]
  );

  const handleLoadMore = useCallback(() => {
    const next = page + 1;
    setPage(next);
    fetchResults(query, next, true);
  }, [page, query, fetchResults]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl relative group mx-auto mb-16">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="text-secondary w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search for themes, colors, or tags..."
          className={`w-full h-16 pl-16 pr-6 bg-transparent border-2 border-primary focus:ring-0 font-label-sm text-label-sm transition-all outline-none rounded-none ${
            searchFocused
              ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
          }`}
        />
        <button type="submit" className="sr-only">Search</button>
      </form>

      {/* Header */}
      <div className="mb-10 border-l-4 border-primary pl-6">
        {query ? (
          <>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-1 block">
              {total} result{total !== 1 ? "s" : ""} for
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase break-all">
              &ldquo;{query}&rdquo;
            </h1>
          </>
        ) : (
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase">
            Search
          </h1>
        )}
      </div>

      {!query.trim() ? (
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-16 h-16 text-outline mb-6" />
          <p className="font-body-md text-body-lg text-secondary max-w-md">
            Enter a keyword above to discover wallpapers.
          </p>
        </section>
      ) : initialLoading ? (
        <section className="flex items-center justify-center py-32">
          <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
        </section>
      ) : total === 0 ? (
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-16 h-16 text-outline mb-6" />
          <p className="font-display-lg text-headline-md mb-2">No results found</p>
          <p className="font-body-md text-body-lg text-secondary max-w-md mb-8">
            No wallpapers match &ldquo;{query}&rdquo;. Try different keywords.
          </p>
        </section>
      ) : (
        <>
          {/* Results Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16">
            {wallpapers.map((item: any) => (
              <Link key={item.id} href={`/allwallpapers/${item.id}`} className="relative group overlay-target cursor-pointer block">
                <div className="bg-surface-container aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover image-zoom transition-transform duration-500 group-hover:scale-105"
                    alt={`${item.category} wallpaper ${item.resolution}`}
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

          {/* Load More */}
          {page < totalPages && (
            <div className="text-center mb-24">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="group inline-flex flex-col items-center gap-4 disabled:opacity-50"
              >
                <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-secondary group-hover:text-primary transition-colors">
                  {loading ? "Loading..." : `Load More (${wallpapers.length} of ${total})`}
                </span>
                <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  )}
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
