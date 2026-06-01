import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const SUPPORT_INBOX = "abdulazeezsodiq403@gmail.com";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  wallet: z.string().trim().min(1).max(50),
  category: z.string().trim().min(1).max(80),
  urgency: z.string().trim().min(1).max(20),
  message: z.string().trim().min(20).max(2000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const d = data;

    const urgencyColor: Record<string, string> = {
      Low: "#4ade80",
      Medium: "#facc15",
      High: "#fb923c",
      Critical: "#ef4444",
    };
    const color = urgencyColor[d.urgency] ?? "#94a3b8";

    const html = `
<!doctype html><html><body style="margin:0;background:#0f172a;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#e2e8f0;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
    <div style="background:linear-gradient(135deg,#06b6d4,#a855f7);padding:20px 24px">
      <h1 style="margin:0;font-size:20px;color:#0f172a">🛟 New ChainRescue Support Case</h1>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#94a3b8;width:110px">Name</td><td style="padding:8px 0"><strong>${escapeHtml(d.name)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(d.email)}" style="color:#22d3ee">${escapeHtml(d.email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Wallet</td><td style="padding:8px 0">${escapeHtml(d.wallet)}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Category</td><td style="padding:8px 0">${escapeHtml(d.category)}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Urgency</td><td style="padding:8px 0"><span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${color};color:#0f172a;font-weight:600;font-size:12px">${escapeHtml(d.urgency)}</span></td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #334155;margin:20px 0" />
      <div style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Message</div>
      <div style="white-space:pre-wrap;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:14px;font-size:14px;line-height:1.6">${escapeHtml(d.message)}</div>
    </div>
    <div style="background:#0f172a;padding:14px 24px;font-size:12px;color:#64748b;text-align:center">Reply directly to respond to ${escapeHtml(d.name)}.</div>
  </div>
</body></html>`.trim();

    const text = `New support case
Name: ${d.name}
Email: ${d.email}
Wallet: ${d.wallet}
Category: ${d.category}
Urgency: ${d.urgency}

Message:
${d.message}`;

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "ChainRescue Support <onboarding@resend.dev>",
        to: [SUPPORT_INBOX],
        reply_to: d.email,
        subject: `[${d.urgency}] ${d.category} — ${d.name} (${d.wallet})`,
        html,
        text,
      }),
    });

    const responseData = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend send failed", res.status, responseData);
      throw new Error(`Email send failed [${res.status}]`);
    }

    return { success: true, id: (responseData as { id?: string }).id };
  });
