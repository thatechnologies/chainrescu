import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is this service really free / how do you charge?",
    a: "Initial triage and guidance are free. For complex recovery cases that require deep investigation, we'll quote a transparent flat fee before any work begins. No surprises.",
  },
  {
    q: "Will you ever ask for my seed phrase or private key?",
    a: "Never. Not once. Not ever. Anyone — including someone claiming to be from us — who asks for your seed phrase is trying to steal from you. Our process never requires it.",
  },
  {
    q: "Can you actually recover lost funds?",
    a: "Sometimes yes, sometimes no — it depends entirely on the situation. Stuck transactions, wrong networks, and forgotten passwords often have solutions. Funds sent to a scammer are usually gone. We'll always be honest about what's possible.",
  },
  {
    q: "Which chains and wallets do you support?",
    a: "Ethereum and EVM chains (Polygon, Arbitrum, Base, BSC, Optimism), Solana, Bitcoin, and most major L2s. Wallet-wise: MetaMask, Phantom, Ledger, Trezor, Trust, Coinbase, Rabby and more.",
  },
  {
    q: "How fast will someone respond?",
    a: "Average first response is under 8 minutes. Critical cases (active drains, time-sensitive recovery) get immediate attention 24/7.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="rounded-xl border border-border bg-gradient-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
