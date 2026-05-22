import { Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Free",
    price: "R$0",
    period: "/mês",
    desc: "Para experimentar a magia.",
    features: ["20 créditos / mês", "Vídeos até 5s", "720p", "Marca d'água"],
    cta: "Criar conta",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$79",
    period: "/mês",
    desc: "Para criadores que publicam todos os dias.",
    features: ["1.500 créditos / mês", "Vídeos até 30s", "1080p", "Sem marca d'água", "Avatares IA", "Render prioritário"],
    cta: "Assinar Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "R$249",
    period: "/mês",
    desc: "Equipes e agências em escala.",
    features: ["Créditos ilimitados*", "Vídeos até 2min", "4K", "API própria", "Multi-seat", "Suporte dedicado"],
    cta: "Falar com vendas",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Planos</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            Comece grátis. <span className="text-gradient">Escale sem limites.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative rounded-3xl p-7 ${p.highlight ? "glass glow border-[color:var(--neon-violet)]/40" : "glass"}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[11px] font-medium text-primary-foreground">
                  Mais popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--neon-violet)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-medium transition ${
                  p.highlight
                    ? "bg-brand text-primary-foreground glow"
                    : "glass hover:border-[color:var(--neon-violet)]/40"
                }`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
