"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3");
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[38px] h-[38px]" />;

  const toggleTheme = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    document.startViewTransition(() => setTheme(newTheme));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border border-outline-variant hover:border-primary transition-colors active:scale-95"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}
