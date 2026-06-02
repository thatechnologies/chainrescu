import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 mt-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
            Crypto <span className="text-gradient-primary">Resolve</span> Hub

          <span>· © {new Date().getFullYear()}</span>
        </div>
        {/* <p className="text-xs">
          Not affiliated with any wallet provider. We never ask for seed phrases.
        </p> */}
      </div>
    </footer>
  );
}
