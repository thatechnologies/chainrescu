const steps = [
  {
    n: "01",
    title: "Tell us what happened",
    desc: "Submit a quick form. Wallet type, network, what you tried. No personal IDs needed.",
  },
  {
    n: "02",
    title: "Get matched with a specialist",
    desc: "Within minutes, an engineer experienced with your specific issue picks up the case.",
  },
  {
    n: "03",
    title: "Resolve, securely",
    desc: "Step-by-step guidance over encrypted chat. We never request seed phrases or private keys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            From panic to resolved
            <br />
            in three steps.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-card border border-primary/30 shadow-glow font-display text-xl font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
