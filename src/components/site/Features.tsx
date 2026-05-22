import { motion } from "motion/react";
import { Wand2, Image as ImageIcon, Mic, Captions, Music4, ScanFace, Gauge, Languages } from "lucide-react";

const items = [
  { icon: Wand2, title: "Texto → Vídeo", desc: "Descreva uma cena. A IA dirige, enquadra e renderiza." },
  { icon: ImageIcon, title: "Foto animada", desc: "Anime fotos estáticas com movimento cinematográfico." },
  { icon: Mic, title: "Narração IA", desc: "Vozes ultra realistas em mais de 30 idiomas." },
  { icon: Captions, title: "Legendas auto", desc: "Legendas sincronizadas e estilizadas automaticamente." },
  { icon: Music4, title: "Trilha sonora", desc: "Música gerada por IA que combina com o clima." },
  { icon: ScanFace, title: "Sync labial", desc: "Avatares falantes com lip sync perfeito." },
  { icon: Gauge, title: "Render GPU", desc: "Fila otimizada para renderizações em segundos." },
  { icon: Languages, title: "Multi-idioma", desc: "Crie e exporte conteúdo para qualquer público." },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Recursos</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            Um estúdio completo, <span className="text-gradient">movido a IA</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative rounded-2xl glass p-5 hover:border-[color:var(--neon-violet)]/40 transition"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand glow">
                <it.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
