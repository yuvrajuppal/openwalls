"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "CATEGORIES", href: "/category" },
  { label: "ALL WALLPAPERS", href: "/allwallpapers" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full top-0 sticky z-50 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-display-lg text-headline-md tracking-tighter text-primary select-none cursor-default">
            OpenWalls
          </Link>
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-label-sm text-label-sm transition-all ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/search"><Search className="text-primary cursor-pointer active:opacity-70 w-[22px] h-[22px]" /></Link>
          <Link className="bg-primary text-on-primary px-6 py-2.5 font-label-sm text-label-sm tracking-wider uppercase hover:bg-secondary transition-colors active:scale-95" href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}