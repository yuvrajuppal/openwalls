"use client";

import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import applogo from "@/assets/applogo.png";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const { initializing } = useSelector((s: RootState) => s.user);

  if (initializing) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6">
        <Image src={applogo} alt="OpenWalls" height={48} className="object-contain" priority />
        <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}
