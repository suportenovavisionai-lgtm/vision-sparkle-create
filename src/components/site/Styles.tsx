import { motion } from "motion/react";

const styles = [
  { name: "Cinematográfico", hint: "Cor, grão e enquadramento de cinema" },
  { name: "Anime", hint: "Linhas vivas e paletas estilizadas" },
  { name: "Realista", hint: "Foto-realismo de alta fidelidade" },
  { name: "Pixar", hint: "Render 3D estilizado e fofo" },
  { name: "Cyberpunk", hint: "Neon, chuva e holografia" },
  { name: "Viral TikTok", hint: "Cortes rápidos e hook instantâneo" },
];

export function Styles() {
  return (
    <section id="styles" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Estilos</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              Escolha a <span className="text-gradient">estética</span> do seu vídeo
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Seis presets prontos para qualquer narrativa — ou combine para criar o seu próprio look.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass p-6 flex flex-col justify-end"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-80 transition group-hover:scale-105"
                style={{
                  background:
                    i % 3 === 0
                      ? "radial-gradient(120% 80% at 20% 10%, oklch(0.72 0.22 305 / 0.55), transparent 60%), radial-gradient(80% 60% at 90% 90%, oklch(0.72 0.2 240 / 0.5), transparent 60%)"
                      : i % 3 === 1
                      ? "radial-gradient(120% 80% at 80% 10%, oklch(0.72 0.24 350 / 0.55), transparent 60%), radial-gradient(80% 60% at 10% 90%, oklch(0.72 0.22 305 / 0.5), transparent 60%)"
                      : "radial-gradient(120% 80% at 50% 0%, oklch(0.72 0.2 240 / 0.55), transparent 60%), radial-gradient(80% 60% at 50% 100%, oklch(0.72 0.24 350 / 0.4), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 -z-10 bg-[oklch(0.13_0.02_280/0.55)]" />
              <span className="inline-flex w-fit rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                Preset 0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
