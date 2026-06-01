import { useState, useRef, useEffect } from "react";
import { ChevronDown, Wallet } from "lucide-react";

export interface WalletOption {
  name: string;
  color: string;
  icon: React.ReactNode;
}

const walletOptions: WalletOption[] = [
  {
    name: "MetaMask",
    color: "#F6851B",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path d="M12 2L4 8l2 10 6 4 6-4 2-10-8-6z" fill="#F6851B" opacity="0.9" />
        <path d="M12 6l-3 4 3 2 3-2-3-4z" fill="#E2761B" />
        <circle cx="12" cy="12" r="2" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Phantom",
    color: "#AB9FF2",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 3c-4.5 0-8 3.5-8 8 0 3.5 2 6 5 7.5.5.2 1 .5 1.5.8.5-.3 1-.6 1.5-.8 3-1.5 5-4 5-7.5 0-4.5-3.5-8-8-8z"
          fill="#AB9FF2"
          opacity="0.9"
        />
        <circle cx="9.5" cy="10" r="1.2" fill="#fff" />
        <circle cx="14.5" cy="10" r="1.2" fill="#fff" />
        <path d="M10 13.5c.8.6 2.2.6 3 0" stroke="#fff" strokeWidth="1" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Ledger",
    color: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" opacity="0.9" />
        <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" fill="#000" />
      </svg>
    ),
  },
  {
    name: "Trezor",
    color: "#00D1FF",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="5" y="6" width="14" height="16" rx="3" fill="#00D1FF" opacity="0.9" />
        <circle cx="12" cy="13" r="3" fill="#fff" opacity="0.9" />
        <circle cx="12" cy="13" r="1.2" fill="#00D1FF" />
      </svg>
    ),
  },
  {
    name: "Trust Wallet",
    color: "#3375BB",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 2L4 7v6c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V7l-8-5z"
          fill="#3375BB"
          opacity="0.9"
        />
        <path d="M9 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Coinbase Wallet",
    color: "#0052FF",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0052FF" opacity="0.9" />
        <path d="M8 12h8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 8v8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Rainbow",
    color: "#001E3D",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#001E3D" opacity="0.9" />
        <path d="M6 14c1.5-3 3-5 6-5s4.5 2 6 5" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M8 15c1-2 2-3.5 4-3.5s3 1.5 4 3.5" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M10 16c.5-1 1-1.5 2-1.5s1.5.5 2 1.5" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Rabby",
    color: "#FF6B00",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF6B00" opacity="0.9" />
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="system-ui">
          R
        </text>
      </svg>
    ),
  },
  {
    name: "OKX Wallet",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#000" opacity="0.9" />
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="system-ui">
          OKX
        </text>
      </svg>
    ),
  },
  {
    name: "Safe",
    color: "#12FF80",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 2L4 7v6c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V7l-8-5z"
          fill="#12FF80"
          opacity="0.9"
        />
        <path d="M12 7l-3 4 3 2 3-2-3-4z" fill="#0a0a1a" />
      </svg>
    ),
  },
  {
    name: "Bitget Wallet",
    color: "#00F0FF",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#00F0FF" opacity="0.9" />
        <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="11" fontWeight="700" fontFamily="system-ui">
          B
        </text>
      </svg>
    ),
  },
  {
    name: "Keplr",
    color: "#1A1A1A",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1A1A1A" opacity="0.9" />
        <path d="M7 10l5-3 5 3v6l-5 3-5-3v-6z" fill="#fff" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Exodus",
    color: "#1F2033",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <defs>
          <linearGradient id="exodusGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00CFCF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#exodusGrad)" opacity="0.9" />
        <path d="M8 12l4-3 4 3-4 3-4-3z" fill="#1F2033" />
      </svg>
    ),
  },
  {
    name: "TokenPocket",
    color: "#2980FE",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2980FE" opacity="0.9" />
        <text x="12" y="16.5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="system-ui">
          TP
        </text>
      </svg>
    ),
  },
  {
    name: "Brave Wallet",
    color: "#FF5500",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M12 2l3 2 2.5-1L20 6l-1 3 1 3-2 5-3 3h-6l-3-3-2-5 1-3-1-3 2.5-3L9 4l3-2z"
          fill="#FF5500"
          opacity="0.9"
        />
        <path d="M9 11l3 2.5L15 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "WalletConnect",
    color: "#3B99FC",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#3B99FC" opacity="0.9" />
        <path d="M7.5 10c2.5-2 6.5-2 9 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M9 12c1.5-1.2 4.5-1.2 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="15" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Other",
    color: "#888888",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="12" r="10" fill="#888" opacity="0.6" />
        <text x="12" y="16.5" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui">
          ?
        </text>
      </svg>
    ),
  },
];

export function WalletSelector({
  name,
  value,
  onChange,
  error,
}: {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(value || "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = walletOptions.find((w) => w.name === selected);

  function handleSelect(name: string) {
    setSelected(name);
    onChange?.(name);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
          error
            ? "border-destructive/60 bg-destructive/5"
            : open
              ? "border-primary bg-primary/10"
              : "border-border bg-input/30 hover:border-primary/40"
        }`}
      >
        <span className="flex items-center gap-2.5">
          {current ? (
            <>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: current.color + "22" }}>
                {current.icon}
              </span>
              <span className="text-foreground">{current.name}</span>
            </>
          ) : (
            <>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              <span className="text-muted-foreground">Select wallet</span>
            </>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-elevated backdrop-blur-md p-1.5">
          <div className="space-y-0.5">
            {walletOptions.map((w) => (
              <button
                key={w.name}
                type="button"
                onClick={() => handleSelect(w.name)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                  selected === w.name
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: w.color + "22" }}
                >
                  {w.icon}
                </span>
                <span className="truncate">{w.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <input type="hidden" name={name} value={selected} />
    </div>
  );
}

export { walletOptions };
