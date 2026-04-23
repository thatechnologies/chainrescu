import { useState } from "react";
import { Send, CheckCircle2, ShieldAlert, AlertCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  wallet: z.string().trim().min(1, "Pick a wallet").max(50),
  category: z.string().min(1, "Pick a category"),
  urgency: z.string().min(1),
  message: z.string().trim().min(20, "Please describe with at least 20 characters").max(2000),
});

const wallets = ["MetaMask", "Phantom", "Ledger", "Trezor", "Trust Wallet", "Coinbase", "Other"];
const categories = [
  "Lost access",
  "Stuck transaction",
  "Suspicious activity",
  "Missing assets",
  "Network/bridge",
  "General help",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the highlighted fields", {
        description: "A few details need attention before we can send your case.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.error ?? "Failed to send. Please try again.";
        setFormError(msg);
        toast.error("Couldn't send your support case", { description: msg });
        return;
      }
      setSubmitted(true);
      toast.success("Support case sent", {
        description: "A specialist will reach out by email shortly.",
      });
    } catch {
      const msg = "Network error. Please check your connection and try again.";
      setFormError(msg);
      toast.error("Network error", { description: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">
              Get help now
            </div>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Open a <span className="text-gradient-primary">support case</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We respond within 8 minutes on average. The more detail you share, the faster we can
              help.
            </p>
            <div className="mt-8 rounded-xl border border-warning/30 bg-warning/5 p-4 flex gap-3">
              <ShieldAlert className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Security promise</div>
                <p className="text-muted-foreground mt-1">
                  We will <strong>never</strong> ask for your seed phrase, private keys, or
                  password. Anyone who does is scamming you.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-elevated backdrop-blur">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 border border-success/30">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">Case opened</h3>
                  <p className="mt-2 text-muted-foreground">
                    A specialist will reach out via email shortly. Check your inbox (and spam).
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Your name" error={errors.name}>
                      <input
                        name="name"
                        maxLength={100}
                        className="form-input"
                        placeholder="Satoshi N."
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        maxLength={255}
                        className="form-input"
                        placeholder="you@email.com"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Wallet" error={errors.wallet}>
                      <select name="wallet" className="form-input" defaultValue="">
                        <option value="" disabled>
                          Select wallet
                        </option>
                        {wallets.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Issue category" error={errors.category}>
                      <select name="category" className="form-input" defaultValue="">
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Urgency">
                    <div className="flex gap-2">
                      {["Low", "Medium", "High", "Critical"].map((u, i) => (
                        <label
                          key={u}
                          className="flex-1 cursor-pointer rounded-lg border border-border bg-input/30 px-3 py-2.5 text-center text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary transition-colors"
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={u}
                            defaultChecked={i === 1}
                            className="sr-only"
                          />
                          {u}
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Describe what happened" error={errors.message}>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={2000}
                      className="form-input resize-none"
                      placeholder="What were you trying to do? What went wrong? Any error messages or transaction hashes?"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : "Submit support case"}
                    <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: oklch(0.19 0.025 256 / 0.6);
          border: 1px solid var(--border);
          border-radius: 0.625rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: var(--foreground);
          transition: all 200ms;
          font-family: inherit;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px oklch(0.82 0.16 200 / 0.15);
        }
        .form-input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
