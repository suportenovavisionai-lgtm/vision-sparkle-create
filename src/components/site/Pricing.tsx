import { Check, Sparkles, Zap, Crown, ArrowRight, Flame } from "lucide-react";
import { motion } from "motion/react";

type Plan = {
  name: string;
  price: string;
  period: string;
  desc: string;
  icon: typeof Sparkles;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  vip?: boolean;
  badge?: string;
  accent: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "R$0",
    period: "/mês",
    desc: "Para experimentar a magia.",
    icon: Sparkles,
    features: ["20 créditos / mês", "Vídeos até 5s", "720p", "Marca d'água"],
    cta: "Criar conta",
    href: "/login",
    accent: "var(--neon-blue)",
  },
  {
    name: "Pro",
    price: "R$79,90",
    period: "/mês",
    desc: "Para criadores que publicam todos os dias.",
    icon: Crown,
    features: [
      "1.500 créditos / mês",
      "Vídeos até 30s",
      "1080p",
      "Sem marca d'água",
      "Avatares IA",
      "Render prioritário",
    ],
    cta: "Assinar Pro",
    href: "https://mpago.la/1cYhz64",
    highlight: true,
    badge: "Mais popular",
    accent: "var(--neon-violet)",
  },
  {
    name: "Business",
    price: "R$29,90",
    period: "/mês",
    desc: "Equipes e agências em escala. VIP.",
    icon: Zap,
    features: [
      "Créditos ilimitados*",
      "Vídeos até 2min",
      "4K Ultra HD",
      "API própria",
      "Multi-seat",
      "Suporte dedicado 24/7",
    ],
    cta: "Assinar Business",
    href: "https://mpago.li/1JFP8Km",
    vip: true,
    badge: "Mais vendido",
    accent: "var(--neon-blue)",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[color:var(--neon-violet)] opacity-[0.12] blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[color:var(--neon-blue)] opacity-[0.10] blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[color:var(--neon-pink)] opacity-[0.08] blur-[120px]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-violet)] animate-pulse" />
            Planos transparentes · sem fidelidade
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Comece grátis. <br className="sm:hidden" />
            <span className="text-gradient">Escale sem limites.</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground px-2">
            Cancele quando quiser. Pagamento 100% seguro via Mercado Pago.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-7 lg:grid-cols-3">
          {plans.map((p, i) => {
            const featured = p.highlight || p.vip;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-500 glass ${
                  featured
                    ? "lg:scale-[1.04] lg:-my-2"
                    : "hover:border-[color:var(--neon-violet)]/30"
                }`}
                style={
                  p.highlight
                    ? {
                        borderColor: "color-mix(in oklab, var(--neon-violet) 50%, transparent)",
                        boxShadow:
                          "0 0 60px color-mix(in oklab, var(--neon-violet) 35%, transparent), 0 30px 80px -30px color-mix(in oklab, var(--neon-blue) 40%, transparent), 0 1px 0 oklch(1 0 0 / 0.08) inset",
                      }
                    : p.vip
                    ? {
                        borderColor: "color-mix(in oklab, var(--neon-blue) 55%, transparent)",
                        boxShadow:
                          "0 0 70px color-mix(in oklab, var(--neon-blue) 40%, transparent), 0 0 120px color-mix(in oklab, var(--neon-violet) 25%, transparent), 0 30px 80px -30px color-mix(in oklab, var(--neon-violet) 45%, transparent), 0 1px 0 oklch(1 0 0 / 0.08) inset",
                      }
                    : undefined
                }
              >
                {featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-70"
                    style={{
                      background: p.vip
                        ? "linear-gradient(135deg, color-mix(in oklab, var(--neon-blue) 55%, transparent), transparent 35%, color-mix(in oklab, var(--neon-violet) 45%, transparent))"
                        : "linear-gradient(135deg, color-mix(in oklab, var(--neon-violet) 40%, transparent), transparent 40%, color-mix(in oklab, var(--neon-blue) 30%, transparent))",
                      mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                      WebkitMask:
                        "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: 1,
                    }}
                  />
                )}

                {p.vip && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon-blue)]/[0.06] via-transparent to-[color:var(--neon-violet)]/[0.08]" />
                  </div>
                )}

                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: p.accent }}
                />

                {p.badge && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={
                      p.vip
                        ? {
                            boxShadow: [
                              "0 0 0px color-mix(in oklab, var(--neon-blue) 0%, transparent)",
                              "0 0 24px color-mix(in oklab, var(--neon-blue) 70%, transparent)",
                              "0 0 0px color-mix(in oklab, var(--neon-blue) 0%, transparent)",
                            ],
                          }
                        : undefined
                    }
                    transition={p.vip ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-lg whitespace-nowrap ${
                      p.vip
                        ? "text-primary-foreground"
                        : "bg-brand text-primary-foreground"
                    }`}
                    style={
                      p.vip
                        ? {
                            background:
                              "linear-gradient(135deg, var(--neon-blue), var(--neon-violet))",
                          }
                        : undefined
                    }
                  >
                    {p.vip && <Flame className="h-3 w-3" />}
                    {p.badge}
                  </motion.span>
                )}

                <div className="relative">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${p.accent} 18%, transparent)`,
                      boxShadow: `0 0 30px color-mix(in oklab, ${p.accent} 25%, transparent)`,
                    }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.accent }} />
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>

                  <div className="mt-6 sm:mt-7 flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                      {p.price}
                    </span>
                    <span className="text-muted-foreground text-sm sm:text-base">{p.period}</span>
                  </div>

                  <div className="my-6 sm:my-7 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                  <ul className="space-y-3 sm:space-y-3.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                          style={{
                            background: `color-mix(in oklab, ${p.accent} 18%, transparent)`,
                          }}
                        >
                          <Check className="h-3 w-3" style={{ color: p.accent }} />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group/btn mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                      p.highlight
                        ? "bg-brand text-primary-foreground glow hover:scale-[1.02] hover:shadow-[0_0_60px_color-mix(in_oklab,var(--neon-violet)_55%,transparent)]"
                        : p.vip
                        ? "text-primary-foreground hover:scale-[1.02]"
                        : "glass hover:border-[color:var(--neon-violet)]/50 hover:bg-white/[0.04]"
                    }`}
                    style={
                      p.vip
                        ? {
                            background:
                              "linear-gradient(135deg, var(--neon-blue), var(--neon-violet) 60%, var(--neon-pink))",
                            boxShadow:
                              "0 0 40px color-mix(in oklab, var(--neon-blue) 50%, transparent), 0 10px 30px -10px color-mix(in oklab, var(--neon-violet) 60%, transparent)",
                          }
                        : undefined
                    }
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          Pagamento seguro · Cancele a qualquer momento · Suporte 24/7
        </motion.p>
      </div>
    </section>
  );
}
