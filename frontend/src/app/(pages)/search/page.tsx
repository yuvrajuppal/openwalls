"use client";

import { Search, ArrowRight, Heart, Download, SearchX } from "lucide-react";
import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const categories = [
  "All",
  "Minimalism",
  "Cyberpunk",
  "Landscape",
  "Abstract",
  "Architecture",
  "Nature",
  "Macro",
  "Industrial",
  "Sci-Fi",
];

const wallpapers = [
  { id: 1, title: "Mountain Solitude", aspect: "aspect-video", tag: "Landscape", resolution: "7680 x 4320", downloads: "12.4K", alt: "Minimalist landscape with mountain peaks", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0G0gE5CsATx56Y_nKh2bASYgsHOjQ0huVqw9Gu9oivPgTMPRcoiUmMLDpHnwWo5YbDfLofBmsztSCMYo8ws-S1LjAj18WweS34iyn2qEiOr2wf9Xd5o-1cAVk3NO9IQK0cg616BlvlI-5cEtXOTyYx_1bY39QHTmgyxCS4efAd5fCm_mlf4FGxbniIpr1DnoY-_d8ON_SuJ0BcZoDo1Xz-q7PZJyAfSDeoqfGRihd2EzSHWnfXwPmDCeYYYPuOn6w7p8EBhzrWI8" },
  { id: 2, title: "Concrete Column", aspect: "aspect-[9/16]", tag: "Architecture", resolution: "2160 x 3840", downloads: "9.8K", alt: "Architectural column detail", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiN4m-J27RbmgpT_QFxfhv2h0Yv6nflPYNZrGVcD3EusW2i1KPsIK1zm0X-9IUGqvxWXRylhjQlP-7Lj1ojUsryWbcGbrJoAjXUn9GpsGQRsVoLYkDrYjpXYfSUt3U9k2YtBEDMDchI2F0zBCknxfG7UMjbfN8GWCbTsiz_CDQs_SIDC7ViVRDyZcx4_WEpIn8rfJpO2e_rInUhOwoy_5j3kDW5JXa2ChmTyEcxMzARn5JLh4RkUVoYcalGzugZxSqawyD5avBudY" },
  { id: 3, title: "Crystalline Macro", aspect: "aspect-[4/5]", tag: "Macro", resolution: "3000 x 3750", downloads: "8.2K", alt: "Crystalline macro texture", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCALVzEKx7ElYzeOauB4lib0Qysos6i5PtjUJMMTBkQwqbqy7aYOZfoNOzcqFDyR1n1J5uE9bn_SuGMdIifStX_HnV6rU0wUA33bOcRA5gLIMuOeW8EtvmLVftr948ENa9meKbd4NWBKQseKwX4oRvjSQtJe3BBlrt541MYenl9CBvse5s1jZAQTkPzUdXXdr-ep7ovkL8FTtqXHCEdGerhdEXu36qzFOCIEr-RJmh4fs-R-Yet8EbJP5oTzyI9OOvXvFtF_V8BKUE" },
  { id: 4, title: "Silk Abstract", aspect: "aspect-video", tag: "Abstract", resolution: "5120 x 2880", downloads: "7.5K", alt: "Abstract silk texture", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJuoTj5SorRakK4sf4JgWJfWlAguDFe_JoxCubW-CKez77WFeP_POSeZDilvUFsQ8eSWQApAMGvgiBPFBDVQqVEiMtnHprJLooZF1WD19HulATe8ZhXfadiDZOU3gMgdu8bqD3A5XTNLz6gkK7igYCLX0u77X-OME9zIm2MSgN2gOh1v92soH_M8580AXC0ftU4BOvN_BwmVChMlGL6EazWno7QMKlZN8xGdBBYIw8vkds2xS_-K6les4eraoDJ45faZjnZ1OFErA" },
  { id: 5, title: "Concrete Stairs", aspect: "aspect-[9/16]", tag: "Industrial", resolution: "1440 x 2560", downloads: "6.9K", alt: "Concrete stairs geometric pattern", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABY5pRd9UIq0CEhUNcUtWr9Huz5JCvWMMrWbYNvB8Jj4Z5E2hG8nBWNgvElnkk7FOaUsPJGvsArkppXb970ahbR8jI-RFPDz90APN_9GsO3Wq9nuC0RPe_Rs0Nsi9ZTMjNixrIWS-7CKRiGZDjAJZ-hV9hNCs-BOnboPcgyyNinsNy45SzeqitAPJ4FJ2YzObAPvSZOho8yBGfngcZcecaX7PJQiNxm10Fi4aQfFz_uZcbobFtrLUhMb-yVAA2oJmfWNWdUOTF4jM" },
  { id: 6, title: "Neon City", aspect: "aspect-video", tag: "Sci-Fi", resolution: "3840 x 2160", downloads: "5.4K", alt: "Futuristic cityscape", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcLkDwp9X9XgupgdPF3vpTdHhbCZWHQN-OjOjBXrx1uIp41YADRGydEnzV_Zzkehta9ZGH8vd0Gk-4F9VRDc8erTHVzQHmG1aXkeOTv3kLrFiA2EfhvpJWUH39zJN0rjsMyOHRwShm5yA5bp_RonbpxrbMW0LoQgfI9bExbFRFpNHlJLlxxVF_2R5KUMBab5Lbko1RlhnnqTP9W2mZnAy7uiNHWcReCxIY3Zz9oyvLk3wLtC_CNGrFHVbd--rEqCl9Jl6OT5taPzs" },
  { id: 7, title: "Vortex Concrete", aspect: "aspect-[4/5]", tag: "Architecture", resolution: "3840 x 2160", downloads: "12.4K", alt: "Brutalist concrete building", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnHf8W6z2nexCVMl980dFQjurQsiTyhld5aEk04sRuZbuI1fv5ZjLKvQZs0Y7mmdFn3z1ON-8j3xXcWeB-hK4qA3kLqetCeN7sYfP2Cfdw4a6l64EFC93hbDeh4YgjLYsAcdO4BaoFrH__UayhO1jeQDyzj3v8T2as5f2wQQ8lHJyDOxh_IF9jc_UbYVJCHZY2EjAJP4A9rz7_ndmBdfw7--iNGJauekTv4nLVA1hc5l8Kpq6FiSvJHT_0wWgh-F7JyqGn3nzwI1s" },
  { id: 8, title: "Liquid Carbon", aspect: "aspect-square", tag: "Abstract", resolution: "7680 x 4320", downloads: "9.8K", alt: "Dark ripples in water", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuM_h3BvonvM3KJLmaNPPdLtiEk90CD_mGchLiyMmPQdxe3M9Zr4ZG1pDhr8FNoyCvZK1xa4igzzoyWa0VsotbCTjLYwSsX3HhMZJKxbYFyKIP2jM8BkzBOkCysK5WofWzoAJArN43bVqpXAaX6i9wjKnqnprDlmAIutov4RwLKQJsZ4ZRosW5PSzkz51LXFyqdcyXd0cBuySsG8yNCIf-G8IR0cLp46Q0ZgnwtUPz1Lh5bPyj49RqQ-dvA-R-aGTw7-scbA5rUeI" },
  { id: 9, title: "Silent Space", aspect: "aspect-[3/4]", tag: "Minimalism", resolution: "3840 x 2160", downloads: "8.2K", alt: "Black chair in white hall", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSPQoraUQTHVGXdW1x7qGUAoVGDgKiT8mvDblj6bTS__ZZI7VNlOipH0T3lH3u6njGJHGXetEFbh-RZduc7gPmPpNIJPBo-YcqQrAA7_tNRCek25dbQm7HTJ6MDhFFjDV-6m5ZsNu-iD9xddBs52a4ICK-_wv5lfz_972S9Zv8NqNX07jYjHqWXcN4echSBhmh4zkNVxcAAu49uR9bGI6kn-HZjiEKXbFTj8lD_UIDPfo4iyh_nm3qCrCUrrPlcCHd1YL1Tvb3XKc" },
  { id: 10, title: "Signal Loss", aspect: "aspect-video", tag: "Cyberpunk", resolution: "5120 x 2880", downloads: "7.5K", alt: "Glitch art vertical bars", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzT4se0OxHJxE3JbuaFAghPM6YZWt2qCakAbowyTS5UXtPOKlXlUVpM1wRAeDtuTM2NQnG0u43U81rEmHTCeqsfOJRFI5YR65tzzJr4YZZJV-uad6MNy1vovs_ZutAkXHj3hGVg7bViortOhPp1GdnnXlwD5sUXFwDiq7tu4UvQkHYS2SCaBA7lztNGRVkbtFGYfiszkHWESuB22pfEDcgxy33aenGDo_gPwqT8Jpf90hOYHvlnrY8gj-IBVvRDZGnECgnVMj06fk" },
  { id: 11, title: "Misty Pines", aspect: "aspect-square", tag: "Nature", resolution: "3840 x 2160", downloads: "6.9K", alt: "Dark forest in fog", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw9FADpxJv1azNzRU2C-jtZLYAZDEf-ukUD5xoF0ozE5rEPxx1BdJ5S4sas0DFEcPp27Ih328VwTMmTFX3CSch96P94BZYLoRoEue7MoXBnuuf9LfSkvrA6OD8LXAFT08qfi_wxC7iPvn0bMAduqqZxxQPkiK7W16baAx_HEMmkh9BcFK-H12ujJp5Bg5tJ2f60wcCb8zBy8l0nRHcmLPNQKZB2L2PI3glH_jBuqoZMv5PXZeriUm4xJxnvpnus1puzHHzb8PR4NQ" },
  { id: 12, title: "Monolith Desk", aspect: "aspect-[4/3]", tag: "Industrial", resolution: "3840 x 2160", downloads: "5.4K", alt: "Minimalist workstation setup", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlzBwVLvXrSHK6p6Z9K0Uj5txoH-ZKAR0c2_PbK1eJz4Eml6o8OSx48k7sJh8T6Lo90wk_yYJi335tByimHJxyMvSulaCJHAZFsAZthKvsI0jm8cOXTvSVgICnjZ8UPqtY909ZcNEgCGS5hjibGuVWyMj-ojYexKYxG_Q9HyxCTmuV-y-VXGhdAPeksh-BsiMl0zBo2puHtHaf_fiANsXv4BsMpxblxa2i06QEnok-oFlx4MCVW9BR54w-F9mJ5NYpjQFiu5yi7vU" },
  { id: 13, title: "Cyber Alley", aspect: "aspect-[9/16]", tag: "Cyberpunk", resolution: "2160 x 3840", downloads: "11.2K", alt: "Rainy neon alleyway", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7XpGeet1ghBQxGhCr4eghqIKMgtMfmmXtmxBJ2lmOimBut_fvLI84sCau8yACaprYvXZru2kLnRKv1KB2PRpISn1i7JQ0dmxtkJ1a8T3Pa2RlfXtn4IOgRgNPad-4DocQV2s3idGeo39q7evlVo4ES6LCoKK8oQq0Xly7Fp2bvQyQgcjfmQWuvJMXjtPgbE4Lkxd2skBA-usVEe209sU_EX2_LprbQOeeEdSpvl13vNrgm-0tlk4LnrPpR1ZCKxjjcOBT4x_PqRw" },
  { id: 14, title: "Frost Crystals", aspect: "aspect-[4/5]", tag: "Nature", resolution: "3000 x 3750", downloads: "4.7K", alt: "Frost crystals macro detail", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBupJrqfx3Gy5w1Mb0HwX65wvhPlGjflMj6YWromw5xnTj3D-uNYUYYSWNuZIPVANHyxLm4KS3L5N2a9B-_YxnUj6M8vbJRwINKcCdfygZGw3icSdOQzFHqrSBKdrvd-K3ajiYf0i6pfORfBFgqAJ5iLJM4JBSIGpXWS5izSLaJngZNgsitjFI2ey0ZN4LSgx6bQVmx4tFaObLl5K9dz29VmAeZXNOdaLUXau_Rzo4fhCSUT6kMoso0tvBIUQixg1U3rM3O4wUB_hU" },
  { id: 15, title: "Circuit Board", aspect: "aspect-video", tag: "Industrial", resolution: "3840 x 2160", downloads: "6.3K", alt: "Close-up circuit board macro", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKucCzklFciDI-l31H-vQeWR0HZw4Lcvz0g96R2kAYFcy4xu2NAsxKwMFA0JPA6iBC7KgZQ11HtRZiZ_KgQwGY3QwI9Wvo4fiAUIeD_i5CRL8k087nMFa9TlJ_JlJRo1sCtAnPdyvMTCaUPRlDXjxTiNQGPTc4s1yXUmq4y9yzFIVfg65j8ZlDYrvWsAy-nS9QRk3nBZIrWmpyWchML651yp2qZ8eTo4CPcPgtheUvmjNgDRiqRwmjgyXvAcwboXFQsbGRm5sPyMo" },
  { id: 16, title: "Nebula Core", aspect: "aspect-[4/5]", tag: "Abstract", resolution: "5120 x 2880", downloads: "9.1K", alt: "Deep space nebula monochrome", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK6iC9Ku2c5pnLXBglLSdMtTUbzNkX6t_LrvyV4DI8h8qBwvwRgbXo_Sk4ZBcC3uJ19fnn2_vKNNnFOFxU3dgIkkgNlHItpCZ8oKjwl5PidDG0vI3KdWE9xGQEenyKBaXeS0cs9im7WtTXw85Jnq26Hr5MFNJ_21VB1fceZGfCFkXWb7FGqOfD2aJREOTunW9zHfPbfr4x81-Kbq1d4xKj50G2HoTflLFffkRoPIVmcBJpXZ4PsMRuriA1Fmmkjbc9GN1HoyxLPoI" },
  { id: 17, title: "Geometric Shards", aspect: "aspect-square", tag: "Abstract", resolution: "4096 x 4096", downloads: "7.8K", alt: "Generative geometric artwork", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTtNTBpywDoUydDwvTb2l3UPUIffwWb09FI7KLBfrcL3a9PaKrOXm6v6DzFjfmuoVS-B0blVNpn6B0RGqMhQ77QbRqShmHSzjGy7zPHCdmW1fHG0K-KH3Fx-Ydbpce-ObmZ9uPdZG2pPoqd7wzNCza21Ma3RfUrUe0oxsIrFuInilN_JiGhk9b07BAT80ju8NySrATzOdJszoUlE3u5WbwRQ7dOr4WwU3eUnx-nWMCEC2pnU5A9GndJu8O35X3KVVuplvV86vOFJQ" },
  { id: 18, title: "Zen Garden", aspect: "aspect-[3/4]", tag: "Minimalism", resolution: "2880 x 3840", downloads: "5.6K", alt: "Raked zen garden monochrome", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKcVq1rc6USvreXYTDJds88z2h18lgAPj012a_FR5W3z-Ci-WdS4oVdxTpPjveh8tce-VVsWTT4CO5XbWlT_NOuPY7NMjRLz9bEo3mn27_wLyrJXcNjx0YiIrysDZiw1KaUTfdxjD0rcqYyVuTOCvmowUbHB8ePGG1rTUpeuO2hrhHo0kjjBJfnxwkJQCH5Ve8QvzTDUY3tTOGJrOcO3PZ6pEeHm_XmI-c09JLkOP56EPLtrotaXDE-WC6tjoXU9S5Vm2s-lyfDA" },
];

const SORT_OPTIONS = [
  { key: "relevance", label: "Relevance" },
  { key: "downloads", label: "Downloads" },
  { key: "date", label: "Date" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["key"];

const ITEMS_PER_PAGE = 9;

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let results = wallpapers;

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.tag.toLowerCase().includes(q) ||
          w.alt.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      results = results.filter((w) => w.tag === activeCategory);
    }

    const sorted = [...results];
    if (sortBy === "downloads") {
      sorted.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
    } else if (sortBy === "date") {
      sorted.sort((a, b) => b.id - a.id);
    }

    return sorted;
  }, [query, activeCategory, sortBy]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < totalResults;

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchInput.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        setPage(1);
      }
    },
    [searchInput, router]
  );

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((key: SortKey) => {
    setSortBy(key);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

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
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {/* Header */}
      <div className="mb-10 border-l-4 border-primary pl-6">
        {query ? (
          <>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-1 block">
              {totalResults} result{totalResults !== 1 ? "s" : ""} for
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
        /* Empty prompt */
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-16 h-16 text-outline mb-6" />
          <p className="font-body-md text-body-lg text-secondary max-w-md">
            Enter a keyword above to discover wallpapers.
          </p>
        </section>
      ) : totalResults === 0 ? (
        /* No results */
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <SearchX className="w-16 h-16 text-outline mb-6" />
          <p className="font-display-lg text-headline-md mb-2">
            No results found
          </p>
          <p className="font-body-md text-body-lg text-secondary max-w-md mb-8">
            No wallpapers match &ldquo;{query}&rdquo;. Try different keywords
            or browse categories.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.slice(1, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-5 py-2 border border-outline-variant font-label-sm text-label-sm hover:border-primary transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            {/* Category chips */}
            <div className="overflow-x-auto no-scrollbar flex-1">
              <div className="flex gap-3 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-5 py-2 font-label-sm text-label-sm transition-all active:scale-95 shrink-0 ${
                      activeCategory === cat
                        ? "bg-primary text-on-primary"
                        : "bg-transparent border border-outline-variant hover:border-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex gap-1 shrink-0">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSortChange(opt.key)}
                  className={`px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider transition-all ${
                    sortBy === opt.key
                      ? "bg-primary text-on-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <section className="masonry-grid mb-16">
            {paginated.map((item) => (
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
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-white bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                      {item.tag}
                    </span>
                    <span className="font-meta-data text-meta-data text-white/70">
                      {item.downloads} downloads
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white border-t border-white/20 pt-6">
                    <span className="font-meta-data text-meta-data tracking-[0.15em] uppercase">
                      {item.resolution}
                    </span>
                    <div className="flex gap-6">
                      <Heart className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform fill-none" />
                      <Download className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Load More */}
          {hasMore && (
            <div className="mb-24 text-center">
              <button
                onClick={handleLoadMore}
                className="group inline-flex flex-col items-center gap-4"
              >
                <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-secondary group-hover:text-primary transition-colors">
                  Load More ({paginated.length} of {totalResults})
                </span>
                <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
