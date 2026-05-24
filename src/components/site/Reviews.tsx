import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  { name: "Lucas Andrade", role: "Diretor criativo · Loop Studio", text: "Mais rápido que o Runway pra prototipar. Salvou nosso pitch.", stars: 5 },
  { name: "Marina Costa", role: "Creator · 1.2M seguidores", text: "Substituí 3 ferramentas. O preset TikTok Viral é absurdo.", stars: 5 },
  { name: "Rafael Tanaka", role: "Founder · Pixelnova", text: "Qualidade inspirada no Veo 3 com preço brasileiro. Adotamos no dia 1.", stars: 5 },
  { name: "Beatriz Lima", role: "Editora · Canal Curtas", text: "O simulador cinematográfico é tão bom que dispensei freelas de motion.", stars: 5 },
  { name: "Pedro Mendes", role: "Diretor de marketing", text: "Geramos 40 anúncios em um fim de semana. CPC caiu 38%.", stars: 5 },
  { name: "Júlia Ribeiro", role: "Agência Outline", text: "Interface limpa nível Apple. O time pegou em 10 minutos.", stars: 5 },
];

const compare = [
  { label: "Mais rápido que Runway Gen-4", value: "3.2×" },
  { label: "Inspirado no motor Veo 3", value: "✓" },
  { label: "Custo vs. Kling AI 3.0", value: "−72%" },
  { label: "Presets cinematográficos", value: "18+" },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compare.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl glass p-5 text-center">
              <div className="font-display text-3xl font-semibold text-gradient">{c.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Avaliações</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            Amado por <span className="text-gradient">criadores</span> e estúdios.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.04 }} className="rounded-2xl glass p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-[color:var(--neon-violet)] text-[color:var(--neon-violet)]" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{r.text}"</p>
              <div className="mt-4">
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
