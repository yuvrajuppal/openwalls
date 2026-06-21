"use client";

import { RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const { initializing } = useSelector((s: RootState) => s.user);

  if (initializing) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6">
        <span className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase select-none">
          OpenWalls
        </span>
        <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}
