import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an OpenWalls account to save your favorite minimalist wallpapers.",
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
