"use client";

import { Search, LogOut, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "@/store/slice/userSlice";
import type { RootState, AppDispatch } from "@/store/store";
import applogo from "@/assets/applogo.png";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "CATEGORIES", href: "/category" },
  { label: "ALL WALLPAPERS", href: "/allwallpapers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loginstate, username } = useSelector((s: RootState) => s.user);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="w-full top-0 sticky z-50 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-12">
          <Link href="/">
            <Image src={applogo} alt="OpenWalls" height={28} className="object-contain" priority />
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
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/search"><Search className="text-primary cursor-pointer active:opacity-70 w-[22px] h-[22px]" /></Link>
          {loginstate ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 font-label-sm text-label-sm tracking-wider uppercase hover:bg-secondary transition-colors active:scale-95"
              >
                <User className="w-4 h-4" />
                {username}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-outline-variant px-4 py-2.5 font-label-sm text-label-sm tracking-wider uppercase hover:border-primary transition-colors active:scale-95"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              className="bg-primary text-on-primary px-6 py-2.5 font-label-sm text-label-sm tracking-wider uppercase hover:bg-secondary transition-colors active:scale-95"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
