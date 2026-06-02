import { KeyRound, AlertTriangle, RefreshCcw, HelpCircle, Coins, Network } from "lucide-react";

const issues = [
  {
    icon: KeyRound,
    title: "Lost wallet access",
    desc: "Forgotten password, missing seed phrase, broken device — we'll guide you through recovery options.",
    tag: "Recovery",
  },
  {
    icon: RefreshCcw,
    title: "Stuck or failed transactions",
    desc: "Pending forever, wrong gas, dropped from mempool. We diagnose and unstick it.",
    tag: "Transactions",
  },
  {
    icon: AlertTriangle,
    title: "Suspicious activity",
    desc: "Unauthorized transfers, phishing, drained wallet. Act fast — we'll triage immediately.",
    tag: "Security",
  },
  {
    icon: Coins,
    title: "Missing tokens or NFTs",
    desc: "Sent to wrong address, not showing in wallet, bridge failed. We'll trace and advise.",
    tag: "Assets",
  },
  {
    icon: Network,
    title: "Network & bridge issues",
    desc: "Wrong chain, RPC errors, bridge stuck mid-transfer. Multi-chain expertise on hand.",
    tag: "Networks",
  },
  {
    icon: HelpCircle,
    title: "Just confused?",
    desc: "New to crypto? Not sure what a wallet is even doing? Ask anything — no judgement.",
    tag: "Guidance",
  },
];

export function Issues() {
  return (
    <section id="issues" className="relative py-20"> 
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-widest text-primary">
            What we solve
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Whatever broke,
            <br />
            <span className="text-gradient">we've seen it before.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick the issue closest to yours, or describe it in your own words. Real support agents
            review every case.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => {
            const Icon = issue.icon;
            return (
              <div
                key={issue.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/40 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1">
                      {issue.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{issue.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {issue.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
