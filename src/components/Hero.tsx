import { ArrowRight, Lock, Zap, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Floating Crypto Elements */}
      <div className="absolute top-10 left-10 text-5xl opacity-30 animate-float text-primary drop-shadow-glow" style={{ animationDelay: "0s" }}>
        ₿
      </div>
      <div className="absolute top-20 right-16 text-4xl opacity-25 animate-float-slow text-blue-400 drop-shadow-glow" style={{ animationDelay: "1s" }}>
        Ξ
      </div>
      <div className="absolute bottom-32 left-20 text-4xl opacity-30 animate-float-reverse text-cyan-400 drop-shadow-glow" style={{ animationDelay: "0.5s" }}>
        ◇
      </div>
      <div className="absolute top-40 right-32 text-5xl opacity-25 animate-float-slow text-primary drop-shadow-glow" style={{ animationDelay: "2s" }}>
        ●
      </div>
      <div className="absolute bottom-20 right-24 text-4xl opacity-30 animate-float-reverse text-blue-400 drop-shadow-glow" style={{ animationDelay: "1.5s" }}>
        ⬟
      </div>
      <div className="absolute top-1/3 left-1/4 text-6xl opacity-20 animate-float text-cyan-400 drop-shadow-glow" style={{ animationDelay: "3s" }}>
        ₿
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-5xl opacity-25 animate-float-slow text-primary drop-shadow-glow" style={{ animationDelay: "2.5s" }}>
        ◆
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
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

          {/* Wallet Logos Marquee */}
          <div className="mt-16">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              We Support All Major Wallets
            </p>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee gap-8 w-max">
                {/* First set of logos */}
                {[
                  { name: "MetaMask", icon: "🦊" },
                  { name: "Trust Wallet", icon: "💙" },
                  { name: "Ledger", icon: "🔐" },
                  { name: "Trezor", icon: "💼" },
                  { name: "Phantom", icon: "👻" },
                  { name: "Coinbase", icon: "🪙" },
                  { name: "Argent", icon: "⚔️" },
                  { name: "Gnosis", icon: "🦅" },
                  { name: "WalletConnect", icon: "🔗" },
                  { name: "Keplr", icon: "🌌" },
                ].map((wallet, idx) => (
                  <div
                    key={`wallet-${idx}`}
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-card/30 border border-border/30 backdrop-blur-sm whitespace-nowrap hover:bg-card/50 transition-colors"
                  >
                    <span className="text-3xl">{wallet.icon}</span>
                    <span className="text-xs font-medium text-foreground">{wallet.name}</span>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[
                  { name: "MetaMask", icon: "🦊" },
                  { name: "Trust Wallet", icon: "💙" },
                  { name: "Ledger", icon: "🔐" },
                  { name: "Trezor", icon: "💼" },
                  { name: "Phantom", icon: "👻" },
                  { name: "Coinbase", icon: "🪙" },
                  { name: "Argent", icon: "⚔️" },
                  { name: "Gnosis", icon: "🦅" },
                  { name: "WalletConnect", icon: "🔗" },
                  { name: "Keplr", icon: "🌌" },
                ].map((wallet, idx) => (
                  <div
                    key={`wallet-duplicate-${idx}`}
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-card/30 border border-border/30 backdrop-blur-sm whitespace-nowrap hover:bg-card/50 transition-colors"
                  >
                    <span className="text-3xl">{wallet.icon}</span>
                    <span className="text-xs font-medium text-foreground">{wallet.name}</span>
                  </div>
                ))}
              </div>
              {/* Gradient overlays for fade effect */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
