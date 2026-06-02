import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Issues } from "@/components/Issues";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Issues />
      <HowItWorks />
      <ContactForm />
      {/* <FAQ /> */}
      {/* <Footer /> */}
      <Toaster richColors position="top-right" theme="dark" />
    </>
  );
}

export default App;
