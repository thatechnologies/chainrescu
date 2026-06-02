import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Crypto <span className="text-gradient-primary">Resolve</span> Hub
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#issues" className="hover:text-foreground transition-colors">
            Common Issues
          </a>
          <a href="#how" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all"
        >
          Get Help
        </a>
      </div>
    </header>
  );
}
