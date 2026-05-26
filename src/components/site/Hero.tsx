import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, Shield, Zap } from "lucide-react";
import hero from "@/assets/hero-visionai.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-violet)] animate-pulse" />
          Nova geração de vídeo com IA · v1.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight"
        >
          Transforme texto e fotos em <br className="hidden md:block" />
          <span className="text-gradient">vídeos cinematográficos</span> com IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground"
        >
          VisionAI gera narração, legendas, trilha e sincronização labial em um único fluxo.
          Do prompt ao MP4 em minutos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          id="cta"
        >
          <a
            href="/login"
            className="group relative inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground glow transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_color-mix(in_oklab,var(--neon-violet)_55%,transparent)]"
          >
            <Sparkles className="h-4 w-4" />
            Começar agora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-[color:var(--neon-violet)]/40 hover:bg-white/[0.04]"
          >
            <Play className="h-4 w-4" /> Ver demonstração
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[color:var(--neon-blue)]" /> Pagamento seguro</span>
          <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[color:var(--neon-violet)]" /> Render em segundos</span>
          <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-[color:var(--neon-pink)]" /> +10.000 criadores</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-brand opacity-30 blur-3xl" />
          <div className="overflow-hidden rounded-3xl glass p-2 glow">
            <img
              src={hero}
              alt="Pré-visualização do gerador de vídeo VisionAI"
              width={1920}
              height={1280}
              className="w-full rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
