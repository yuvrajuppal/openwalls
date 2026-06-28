import type { Metadata } from "next";
import { Suspense } from "react";
import SearchContent from "./SearchContent";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  if (!q) {
    return { title: "Search Wallpapers" };
  }
  return {
    title: `"${q}" - Search Results`,
    description: `Search results for "${q}". Find high-resolution minimalist wallpapers matching your query.`,
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
