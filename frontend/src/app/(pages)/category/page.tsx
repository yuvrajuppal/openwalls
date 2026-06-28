"use client";

import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { APIROUTES } from "@/utils/APIROUTES";

const categoryImages: Record<string, string> = {
  general: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKcVq1rc6USvreXYTDJds88z2h18lgAPj012a_FR5W3z-Ci-WdS4oVdxTpPjveh8tce-VVsWTT4CO5XbWlT_NOuPY7NMjRLz9bEo3mn27_wLyrJXcNjx0YiIrysDZiw1KaUTfdxjD0rcqYyVuTOCvmowUbHB8ePGG1rTUpeuO2hrhHo0kjjBJfnxwkJQCH5Ve8QvzTDUY3tTOGJrOcO3PZ6pEeHm_XmI-c09JLkOP56EPLtrotaXDE-WC6tjoXU9S5Vm2s-lyfDA",
  anime: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEoqEv_KQWoenAxPSE0AI6ER6oQjN5wCPKxl8Y2jwIRbh_--sNcZf1U3NEVw2sfKNoekTYX3Jhlhdoan8rioH_0EdBhW0SHeOoUDDVqJdUi1cABc22qTfbn4K1_vdBuksNWLAQ1I04I4JE3xsyLGj7UncnxLPUybRktj89ZhzggJb2a0rtH7WjA0LJitInclNFMlRJ1ztqXJMvqlWnE36eGVZuj3jPjC1EwzcVnaBYirozjvJ2Z51P1vrQxGDU5mMQ5VRug4q1ezU",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(APIROUTES.wallpapersCategories)
      .then(({ data }) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      <header className="mb-16 border-l-4 border-primary pl-6">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2">Categories</h1>
        <p className="font-meta-data text-meta-data uppercase tracking-widest text-secondary">
          Curated visual taxonomies for digital surfaces
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse h-80 bg-surface-container-high" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-fadeIn">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              className="category-card relative group overflow-hidden h-80 w-full bg-black flex items-center justify-center"
              href={`/search?q=${cat.name}`}
            >
              <img
                className="card-bg absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-600"
                alt={`${cat.name} wallpapers category`}
                src={categoryImages[cat.name] || ""}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="relative z-10 text-center px-6">
                <h2 className="font-display-lg text-white mb-2 tracking-tighter uppercase">{cat.name}</h2>
                <span className="font-label-sm text-white/80 bg-black/40 px-3 py-1 backdrop-blur-sm">
                  {cat.count.toLocaleString()} WALLPAPERS
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
