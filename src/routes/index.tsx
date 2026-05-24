import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Styles } from "@/components/site/Styles";
import { Pricing } from "@/components/site/Pricing";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VisionAI — Vídeos cinematográficos com IA" },
      { name: "description", content: "Crie vídeos cinematográficos a partir de texto, fotos e voz com IA. Narração, legendas, trilha e lip sync em um único fluxo." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Styles />
      <section id="showcase" className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Showcase</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            Feito por criadores. <span className="text-gradient">Amado por marcas.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Em breve: galeria interativa com vídeos gerados pela comunidade.
          </p>
        </div>
      </section>
      <Reviews />
      <Pricing />
      <Footer />
    </main>
  );
}
