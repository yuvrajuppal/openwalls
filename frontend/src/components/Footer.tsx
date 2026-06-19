export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-outline-variant py-16 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="font-display-lg text-headline-md text-primary tracking-tighter uppercase select-none">OpenWalls</span>
            <p className="font-label-sm text-meta-data uppercase tracking-[0.15em] text-secondary">
              &copy; 2024 OpenWalls. Built for the high-res community.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">Terms</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">API</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
