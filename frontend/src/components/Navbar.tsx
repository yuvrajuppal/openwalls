import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full top-0 sticky z-50 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-12">
          <span className="font-display-lg text-headline-md tracking-tighter text-primary select-none cursor-default">OpenWalls</span>
          <div className="hidden md:flex gap-10">
            <a className="font-label-sm text-label-sm text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer transition-all" href="#">HOME</a>
            <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors cursor-pointer" href="#">CATEGORIES</a>
            <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors cursor-pointer" href="#">TOPLIST</a>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Search className="text-primary cursor-pointer active:opacity-70 w-[22px] h-[22px]" />
          <button className="bg-primary text-on-primary px-6 py-2.5 font-label-sm text-label-sm tracking-wider uppercase hover:bg-secondary transition-colors active:scale-95">Submit</button>
        </div>
      </div>
    </nav>
  );
}