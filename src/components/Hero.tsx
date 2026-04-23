import { ArrowRight, Lock, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            24/7 Expert Support · Avg. response &lt; 8 min
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight md:text-7xl leading-[1.05]">
            Crypto wallet trouble?
            <br />
            <span className="text-gradient-primary">We've got you.</span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Lost access, stuck transactions, suspicious activity, or just confused — talk to a
            human who actually understands blockchain. No bots, no scripts.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all"
            >
              Open a Support Case
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#issues"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card/50 px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur hover:bg-card transition-all"
            >
              Browse Common Issues
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              End-to-end encrypted
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              We never ask for seed phrases
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              4,200+ wallets recovered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Shield } from "lucide-react";
