import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Issues } from "@/components/Issues";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChainRescue — Crypto Wallet Support, 24/7" },
      {
        name: "description",
        content:
          "Lost wallet access, stuck transactions, suspicious activity? Real blockchain engineers help you recover and resolve crypto issues fast. We never ask for seed phrases.",
      },
      { property: "og:title", content: "ChainRescue — Crypto Wallet Support, 24/7" },
      {
        property: "og:description",
        content: "Real engineers, real help. Average response under 8 minutes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Issues />
        <HowItWorks />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
