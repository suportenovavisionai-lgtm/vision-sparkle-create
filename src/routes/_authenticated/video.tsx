import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Wand2,
  ArrowLeft,
  Play,
  Pause,
  Download,
  Loader2,
  Film,
  Clock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/video")({
  component: VideoPage,
  head: () => ({ meta: [{ title: "Texto → Vídeo — VisionAI" }] }),
});

type Preset = {
  id: string;
  name: string;
  hint: string;
  suffix: string;
  gradient: string;
};

const PRESETS: Preset[] = [
  { id: "cinematic", name: "Hollywood", hint: "Lente anamórfica, dramático", suffix: "filmado em 35mm anamórfico, grading cinematográfico, luz dramática, profundidade de campo, qualidade IMAX", gradient: "linear-gradient(135deg, oklch(0.72 0.22 305 / 0.7), oklch(0.72 0.2 240 / 0.5))" },
  { id: "realistic", name: "Realista", hint: "Fotorrealismo 8k", suffix: "vídeo ultra realista, captura documental, iluminação natural, 8k, lente 50mm f/1.4", gradient: "linear-gradient(135deg, oklch(0.72 0.2 240 / 0.7), oklch(0.72 0.18 200 / 0.5))" },
  { id: "anime", name: "Anime", hint: "Movimento estilo Ghibli", suffix: "estilo anime japonês moderno, cell shading, paleta vibrante, fluidez Ghibli/Shinkai", gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.72 0.22 305 / 0.5))" },
  { id: "cyberpunk", name: "Cyberpunk", hint: "Neon, chuva, hologramas", suffix: "estética cyberpunk, neon vibrante, chuva, reflexos molhados, Blade Runner, magenta e ciano", gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.72 0.2 240 / 0.6))" },
  { id: "viral", name: "TikTok Viral", hint: "Vertical, hook forte", suffix: "vertical 9:16, hook visual nos primeiros segundos, cortes rápidos, contraste forte, estética viral", gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.8 0.18 60 / 0.5))" },
  { id: "comercial", name: "Comercial", hint: "Produto premium", suffix: "comercial premium de produto, macro shots, iluminação de estúdio, slow motion, estética Apple", gradient: "linear-gradient(135deg, oklch(0.8 0.18 80 / 0.7), oklch(0.72 0.2 240 / 0.5))" },
  { id: "trailer", name: "Trailer", hint: "Épico de filme", suffix: "trailer épico de filme, cortes impactantes, trilha orquestral, escala grandiosa, blockbuster", gradient: "linear-gradient(135deg, oklch(0.3 0.1 280 / 0.9), oklch(0.72 0.24 350 / 0.5))" },
];

const READY_PROMPTS = [
  "Um astronauta correndo em câmera lenta por um deserto de cristal sob duas luas",
  "Drone subindo sobre Tóquio à noite, neon refletindo na chuva, 21:9 cinematográfico",
  "Close-up de um relógio de luxo girando, partículas douradas, fundo preto absoluto",
  "Surfista pegando uma onda gigante ao pôr do sol, slow motion, água cristalina",
  "Carro esportivo derrapando em uma rua molhada de Hong Kong, lens flare, neon",
];

// Stock cinematic video URLs (CDN-hosted demos) used to simulate a render preview
const DEMO_VIDEOS = [
  "https://cdn.coverr.co/videos/coverr-a-drone-shot-of-a-mountain-9520/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-night-city-traffic-8888/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-aurora-borealis-over-mountains-2633/1080p.mp4",
];

type Job = { id: string; prompt: string; preset: string; videoUrl: string; createdAt: number };
const KEY = "visionai_video_history";

function VideoPage() {
  const router = useRouter();
  const [activePreset, setActivePreset] = useState("cinematic");
  const [prompt, setPrompt] = useState("");
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [history, setHistory] = useState<Job[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (h: Job[]) => {
    setHistory(h);
    try { localStorage.setItem(KEY, JSON.stringify(h.slice(0, 20))); } catch {}
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Descreva a cena que você quer gerar.");
      return;
    }
    setRendering(true);
    setProgress(0);
    setCurrentVideo(null);
    const stages = [
      { p: 12, s: "Analisando prompt com IA..." },
      { p: 28, s: "Otimizando prompt cinematográfico..." },
      { p: 45, s: "Gerando keyframes na GPU..." },
      { p: 68, s: "Renderizando movimento e iluminação..." },
      { p: 85, s: "Aplicando grading e upscale 4K..." },
      { p: 96, s: "Finalizando vídeo..." },
    ];
    for (const st of stages) {
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
      setProgress(st.p);
      setStage(st.s);
    }
    await new Promise((r) => setTimeout(r, 400));
    setProgress(100);
    setStage("Pronto!");
    const url = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)];
    setCurrentVideo(url);
    const job: Job = {
      id: crypto.randomUUID(),
      prompt: prompt.trim(),
      preset: PRESETS.find((p) => p.id === activePreset)!.name,
      videoUrl: url,
      createdAt: Date.now(),
    };
    persist([job, ...history]);
    toast.success("Vídeo renderizado com sucesso!");
    setRendering(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[color:var(--neon-violet)] opacity-10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[color:var(--neon-blue)] opacity-10 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => router.navigate({ to: "/dashboard" })} className="grid h-8 w-8 place-items-center rounded-full glass hover:bg-background/60 transition" aria-label="Voltar">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">VisionAI</span>
            </Link>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">Texto → Vídeo</span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-sm text-muted-foreground">Studio</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Crie vídeos <span className="text-gradient">cinematográficos</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">Inspirado nos motores Veo 3, Runway Gen-4 e Kling AI 3.0.</p>
        </motion.div>

        {/* Presets */}
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold">Estilo cinematográfico</h2>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3">
            {PRESETS.map((p) => {
              const active = p.id === activePreset;
              return (
                <button key={p.id} onClick={() => setActivePreset(p.id)} className={`group relative overflow-hidden rounded-2xl border text-left p-3 sm:p-4 transition ${active ? "border-[color:var(--neon-violet)] glow" : "border-border hover:border-border/80"}`}>
                  <div className="absolute inset-0 -z-10 opacity-70" style={{ background: p.gradient }} />
                  <div className="absolute inset-0 -z-10 bg-[oklch(0.13_0.02_280/0.55)]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{active ? "Ativo" : "Preset"}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[color:var(--neon-violet)] shadow-[0_0_10px_var(--neon-violet)]" />}
                  </div>
                  <div className="mt-2 font-display text-sm sm:text-base font-semibold">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2">{p.hint}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Composer + Preview */}
        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl glass p-4 sm:p-5">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Prompt da cena</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: drone subindo sobre uma floresta tropical ao amanhecer, neblina, raios de sol entre as árvores"
              rows={5}
              className="mt-2 w-full resize-none rounded-2xl bg-background/60 border border-border px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-violet)] transition"
            />

            <div className="mt-3">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Sugestões prontas</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {READY_PROMPTS.map((rp) => (
                  <button key={rp} onClick={() => setPrompt(rp)} className="text-[11px] glass rounded-full px-2.5 py-1 hover:border-[color:var(--neon-violet)]/50 transition">
                    {rp.length > 50 ? rp.slice(0, 50) + "…" : rp}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={rendering}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground glow disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {rendering ? (<><Loader2 className="h-4 w-4 animate-spin" />Renderizando...</>) : (<><Wand2 className="h-4 w-4" />Gerar vídeo</>)}
            </button>

            <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> 5 créditos</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ~10s</span>
              <span className="flex items-center gap-1"><Film className="h-3 w-3" /> 1080p</span>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-3xl glass p-4 sm:p-5 flex flex-col">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Preview</label>
            <div className="mt-2 relative flex-1 min-h-[260px] rounded-2xl overflow-hidden bg-black border border-border">
              <AnimatePresence mode="wait">
                {rendering && (
                  <motion.div key="render" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <div className="absolute inset-0 opacity-30" style={{ background: "conic-gradient(from 0deg, var(--neon-violet), var(--neon-blue), var(--neon-pink), var(--neon-violet))", animation: "spin 4s linear infinite", filter: "blur(40px)" }} />
                    <div className="relative">
                      <Loader2 className="h-10 w-10 animate-spin text-white" />
                      <div className="mt-4 font-display text-lg text-white">{stage}</div>
                      <div className="mt-1 text-xs text-white/60">{progress}% concluído</div>
                      <div className="mt-4 h-1.5 w-64 rounded-full bg-white/10 overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-[color:var(--neon-violet)] via-[color:var(--neon-pink)] to-[color:var(--neon-blue)]" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                {!rendering && currentVideo && (
                  <motion.div key="video" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0">
                    <video ref={videoRef} src={currentVideo} className="h-full w-full object-cover" loop muted playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
                    <div className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent">
                      <button onClick={togglePlay} className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:scale-105 transition">
                        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                      </button>
                      <a href={currentVideo} download="visionai-video.mp4" className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/20 transition">
                        <Download className="h-3 w-3" /> Baixar MP4
                      </a>
                    </div>
                  </motion.div>
                )}
                {!rendering && !currentVideo && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div>
                      <Film className="mx-auto h-8 w-8 text-white/40" />
                      <p className="mt-3 text-sm text-white/60">Seu vídeo cinematográfico aparecerá aqui.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Histórico</h2>
            {history.length > 0 && (
              <button onClick={() => persist([])} className="text-xs text-muted-foreground hover:text-foreground">Limpar</button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="mt-4 rounded-2xl glass p-8 text-center">
              <Film className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Seus vídeos gerados aparecerão aqui.</p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {history.map((j) => (
                <motion.div key={j.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="group relative overflow-hidden rounded-2xl glass">
                  <div className="aspect-video overflow-hidden bg-black">
                    <video src={j.videoUrl} className="h-full w-full object-cover" muted playsInline loop onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{j.preset}</div>
                    <div className="mt-0.5 text-xs line-clamp-2">{j.prompt}</div>
                    <a href={j.videoUrl} download className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[11px] font-medium hover:bg-background transition">
                      <Download className="h-3 w-3" /> Baixar
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
