"use client";

import { Search, ArrowRight, Heart, Download } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const categories = ["Minimalism", "Cyberpunk", "Landscape", "Anime", "Abstract", "Architecture"];

const wallpapers = [
  { id: 1, aspect: "aspect-video", tag: "Nature", resolution: "7680 x 4320", alt: "Minimalist landscape", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0G0gE5CsATx56Y_nKh2bASYgsHOjQ0huVqw9Gu9oivPgTMPRcoiUmMLDpHnwWo5YbDfLofBmsztSCMYo8ws-S1LjAj18WweS34iyn2qEiOr2wf9Xd5o-1cAVk3NO9IQK0cg616BlvlI-5cEtXOTyYx_1bY39QHTmgyxCS4efAd5fCm_mlf4FGxbniIpr1DnoY-_d8ON_SuJ0BcZoDo1Xz-q7PZJyAfSDeoqfGRihd2EzSHWnfXwPmDCeYYYPuOn6w7p8EBhzrWI8" },
  { id: 2, aspect: "aspect-[9/16]", tag: "Architecture", resolution: "2160 x 3840", alt: "Architectural column", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiN4m-J27RbmgpT_QFxfhv2h0Yv6nflPYNZrGVcD3EusW2i1KPsIK1zm0X-9IUGqvxWXRylhjQlP-7Lj1ojUsryWbcGbrJoAjXUn9GpsGQRsVoLYkDrYjpXYfSUt3U9k2YtBEDMDchI2F0zBCknxfG7UMjbfN8GWCbTsiz_CDQs_SIDC7ViVRDyZcx4_WEpIn8rfJpO2e_rInUhOwoy_5j3kDW5JXa2ChmTyEcxMzARn5JLh4RkUVoYcalGzugZxSqawyD5avBudY" },
  { id: 3, aspect: "aspect-[4/5]", tag: "Macro", resolution: "3000 x 3750", alt: "Crystalline macro", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCALVzEKx7ElYzeOauB4lib0Qysos6i5PtjUJMMTBkQwqbqy7aYOZfoNOzcqFDyR1n1J5uE9bn_SuGMdIifStX_HnV6rU0wUA33bOcRA5gLIMuOeW8EtvmLVftr948ENa9meKbd4NWBKQseKwX4oRvjSQtJe3BBlrt541MYenl9CBvse5s1jZAQTkPzUdXXdr-ep7ovkL8FTtqXHCEdGerhdEXu36qzFOCIEr-RJmh4fs-R-Yet8EbJP5oTzyI9OOvXvFtF_V8BKUE" },
  { id: 4, aspect: "aspect-video", tag: "Abstract", resolution: "5120 x 2880", alt: "Abstract silk", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJuoTj5SorRakK4sf4JgWJfWlAguDFe_JoxCubW-CKez77WFeP_POSeZDilvUFsQ8eSWQApAMGvgiBPFBDVQqVEiMtnHprJLooZF1WD19HulATe8ZhXfadiDZOU3gMgdu8bqD3A5XTNLz6gkK7igYCLX0u77X-OME9zIm2MSgN2gOh1v92soH_M8580AXC0ftU4BOvN_BwmVChMlGL6EazWno7QMKlZN8xGdBBYIw8vkds2xS_-K6les4eraoDJ45faZjnZ1OFErA" },
  { id: 5, aspect: "aspect-[9/16]", tag: "Industrial", resolution: "1440 x 2560", alt: "Concrete stairs", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABY5pRd9UIq0CEhUNcUtWr9Huz5JCvWMMrWbYNvB8Jj4Z5E2hG8nBWNgvElnkk7FOaUsPJGvsArkppXb970ahbR8jI-RFPDz90APN_9GsO3Wq9nuC0RPe_Rs0Nsi9ZTMjNixrIWS-7CKRiGZDjAJZ-hV9hNCs-BOnboPcgyyNinsNy45SzeqitAPJ4FJ2YzObAPvSZOho8yBGfngcZcecaX7PJQiNxm10Fi4aQfFz_uZcbobFtrLUhMb-yVAA2oJmfWNWdUOTF4jM" },
  { id: 6, aspect: "aspect-video", tag: "Sci-Fi", resolution: "3840 x 2160", alt: "Futuristic city", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcLkDwp9X9XgupgdPF3vpTdHhbCZWHQN-OjOjBXrx1uIp41YADRGydEnzV_Zzkehta9ZGH8vd0Gk-4F9VRDc8erTHVzQHmG1aXkeOTv3kLrFiA2EfhvpJWUH39zJN0rjsMyOHRwShm5yA5bp_RonbpxrbMW0LoQgfI9bExbFRFpNHlJLlxxVF_2R5KUMBab5Lbko1RlhnnqTP9W2mZnAy7uiNHWcReCxIY3Zz9oyvLk3wLtC_CNGrFHVbd--rEqCl9Jl6OT5taPzs" },
];

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Minimalism");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchValue.trim();
      if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [searchValue, router]
  );

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
      <section className="py-24 md:py-36 flex flex-col items-center text-center">
        <h2 className="font-headline-md text-headline-md text-secondary mb-12 max-w-2xl leading-relaxed">
          Curated, high-resolution minimalist wallpapers for the modern interface.
        </h2>
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-secondary w-5 h-5" />
          </div>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`w-full h-16 pl-16 pr-6 bg-transparent border-2 border-primary focus:ring-0 font-label-sm text-label-sm transition-all outline-none rounded-none ${
              searchFocused ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
            }`}
            placeholder="Search for themes, colors, or tags..."
            type="text"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </form>
      </section>

      <section className="mb-16 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max pb-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 font-label-sm text-label-sm transition-all active:scale-95 ${
                activeCategory === cat
                  ? "bg-primary text-on-primary"
                  : "bg-transparent border border-outline-variant hover:border-primary"
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="flex justify-between items-end mb-10 border-b border-outline-variant pb-6">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-2 block">Curation</span>
          <h3 className="font-display-lg text-headline-md tracking-tighter uppercase">Trending This Week</h3>
        </div>
        <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-2 group" href="#">
          View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <section className="masonry-grid mb-32">
        {wallpapers.map((item) => (
          <div key={item.id} className="masonry-item relative group overlay-target cursor-zoom-in">
            <div className={`bg-surface-container ${item.aspect} overflow-hidden`}>
              <img className="w-full h-full object-cover image-zoom" alt={item.alt} src={item.src} />
            </div>
            <div className="overlay-content absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
              <div className="mb-4">
                <span className="font-label-sm text-label-sm text-white bg-white/10 px-2.5 py-1 backdrop-blur-sm">{item.tag}</span>
              </div>
              <div className="flex justify-between items-center text-white border-t border-white/20 pt-6">
                <span className="font-meta-data text-meta-data tracking-[0.15em] uppercase">{item.resolution}</span>
                <div className="flex gap-6">
                  <Heart className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform fill-none" />
                  <Download className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}
