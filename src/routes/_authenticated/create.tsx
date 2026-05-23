import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Upload,
  Wand2,
  Download,
  Loader2,
  X,
  ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { generateImage } from "@/lib/image-gen.functions";

export const Route = createFileRoute("/_authenticated/create")({
  component: CreatePage,
  head: () => ({ meta: [{ title: "Criar — VisionAI" }] }),
});

type Preset = {
  id: string;
  name: string;
  hint: string;
  suffix: string;
  gradient: string;
};

const PRESETS: Preset[] = [
  {
    id: "cinematic",
    name: "Cinematográfico",
    hint: "Luz dramática, câmera de cinema",
    suffix:
      "estilo cinematográfico, luz dramática, lente anamórfica, câmera de cinema, ultra detalhado, cores realistas, profundidade de campo, composição premiada",
    gradient: "linear-gradient(135deg, oklch(0.72 0.22 305 / 0.7), oklch(0.72 0.2 240 / 0.5))",
  },
  {
    id: "anime",
    name: "Anime",
    hint: "Estilo anime japonês moderno",
    suffix:
      "estilo anime japonês moderno, traços suaves, cell shading, paleta vibrante, qualidade studio Ghibli/Makoto Shinkai",
    gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.72 0.22 305 / 0.5))",
  },
  {
    id: "realistic",
    name: "Realista",
    hint: "Foto ultra realista 8k",
    suffix:
      "foto ultra realista, textura natural da pele, iluminação natural, qualidade 8k, lente 50mm, fotorrealismo",
    gradient: "linear-gradient(135deg, oklch(0.72 0.2 240 / 0.7), oklch(0.72 0.18 200 / 0.5))",
  },
  {
    id: "pixar",
    name: "Pixar",
    hint: "Render 3D estilizado",
    suffix:
      "render 3D estilo Pixar/Disney, iluminação suave, personagens fofos e amigáveis, materiais subsurface scattering, alta qualidade",
    gradient: "linear-gradient(135deg, oklch(0.8 0.18 80 / 0.7), oklch(0.72 0.24 350 / 0.5))",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    hint: "Neon, futurista, hologramas",
    suffix:
      "estética cyberpunk, neon vibrante, cidade futurista, hologramas, chuva, reflexos molhados, atmosfera Blade Runner, cores vibrantes magenta e ciano",
    gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.72 0.2 240 / 0.6))",
  },
  {
    id: "pixel",
    name: "Pixel Art",
    hint: "Videogame retrô 16 bits",
    suffix:
      "pixel art estilo videogame retrô 16 bits, paleta limitada, pixels nítidos, estética SNES/Genesis",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 140 / 0.7), oklch(0.72 0.2 240 / 0.5))",
  },
  {
    id: "viral",
    name: "Viral TikTok",
    hint: "Contraste forte, estética social",
    suffix:
      "visual moderno viral de redes sociais, contraste forte, cores saturadas, composição chamativa, estética TikTok/Reels, alta legibilidade no mobile",
    gradient: "linear-gradient(135deg, oklch(0.72 0.24 350 / 0.7), oklch(0.8 0.18 60 / 0.5))",
  },
];

type GalleryItem = { id: string; url: string; prompt: string; preset: string };
const STORAGE_KEY = "visionai_gallery";

function CreatePage() {
  const router = useRouter();
  const genFn = useServerFn(generateImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePreset, setActivePreset] = useState<string>("cinematic");
  const [prompt, setPrompt] = useState("");
  const [uploadDataUrl, setUploadDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setGallery(JSON.parse(raw));
    } catch {}
  }, []);

  const saveGallery = (next: GalleryItem[]) => {
    setGallery(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, 30)));
    } catch {}
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Envie um arquivo de imagem.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx 8MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUploadDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Descreva o que você quer gerar.");
      return;
    }
    const preset = PRESETS.find((p) => p.id === activePreset)!;
    setLoading(true);
    try {
      const res = await genFn({
        data: {
          prompt: prompt.trim(),
          styleSuffix: preset.suffix,
          imageDataUrl: uploadDataUrl ?? undefined,
        },
      });
      if (res.error || !res.imageUrl) {
        toast.error(res.error ?? "Falha ao gerar.");
        return;
      }
      const item: GalleryItem = {
        id: crypto.randomUUID(),
        url: res.imageUrl,
        prompt: prompt.trim(),
        preset: preset.name,
      };
      saveGallery([item, ...gallery]);
      toast.success("Imagem gerada!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao gerar imagem.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (item: GalleryItem) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = `visionai-${item.id.slice(0, 8)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[color:var(--neon-violet)] opacity-10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[color:var(--neon-blue)] opacity-10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.navigate({ to: "/dashboard" })}
              className="grid h-8 w-8 place-items-center rounded-full glass hover:bg-background/60 transition"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">VisionAI</span>
            </Link>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">Studio</span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">Studio</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Gere imagens com <span className="text-gradient">IA</span>
          </h1>
        </motion.div>

        {/* Presets */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Estilo</h2>
            <span className="text-xs text-muted-foreground">{PRESETS.length} presets</span>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3">
            {PRESETS.map((p) => {
              const active = p.id === activePreset;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id)}
                  className={`group relative overflow-hidden rounded-2xl border text-left p-3 sm:p-4 transition ${
                    active
                      ? "border-[color:var(--neon-violet)] glow"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <div
                    className="absolute inset-0 -z-10 opacity-70"
                    style={{ background: p.gradient }}
                  />
                  <div className="absolute inset-0 -z-10 bg-[oklch(0.13_0.02_280/0.55)]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {active ? "Ativo" : `Preset`}
                    </span>
                    {active && (
                      <span className="h-2 w-2 rounded-full bg-[color:var(--neon-violet)] shadow-[0_0_10px_var(--neon-violet)]" />
                    )}
                  </div>
                  <div className="mt-2 font-display text-sm sm:text-base font-semibold">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2">{p.hint}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Composer */}
        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl glass p-4 sm:p-5">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: um astronauta surfando em uma onda de neon sobre Marte"
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl bg-background/60 border border-border px-4 py-3 text-sm outline-none focus:border-[color:var(--neon-violet)] transition"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground">Estilo aplicado:</span>
              <span className="rounded-full glass px-3 py-1 text-[11px]">
                {PRESETS.find((p) => p.id === activePreset)?.name}
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm hover:bg-background transition"
              >
                <Upload className="h-4 w-4" />
                {uploadDataUrl ? "Trocar imagem" : "Enviar imagem (opcional)"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = "";
                }}
              />

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground glow disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Gerar imagem
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Upload preview */}
          <div className="rounded-3xl glass p-4 sm:p-5 flex flex-col">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Referência
            </label>
            <div className="mt-2 relative flex-1 min-h-[160px] rounded-2xl border border-dashed border-border bg-background/40 overflow-hidden flex items-center justify-center">
              {uploadDataUrl ? (
                <>
                  <img
                    src={uploadDataUrl}
                    alt="Referência"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setUploadDataUrl(null)}
                    className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
                    aria-label="Remover"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <div className="text-center px-4 py-6">
                  <ImageIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Adicione uma imagem para guiar a geração.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Loading skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-3xl glass p-6 flex items-center gap-4"
            >
              <div className="relative h-16 w-16 rounded-2xl bg-brand glow overflow-hidden">
                <div className="absolute inset-0 animate-pulse" />
              </div>
              <div>
                <div className="font-display font-semibold">Renderizando sua visão...</div>
                <div className="text-xs text-muted-foreground">
                  A IA está pintando pixel por pixel. Pode levar alguns segundos.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Galeria</h2>
            {gallery.length > 0 && (
              <button
                onClick={() => saveGallery([])}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Limpar
              </button>
            )}
          </div>

          {gallery.length === 0 ? (
            <div className="mt-4 rounded-2xl glass p-8 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background/40">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Suas imagens geradas aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {gallery.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative overflow-hidden rounded-2xl glass"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.prompt}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/95 to-transparent">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.preset}
                    </div>
                    <div className="mt-0.5 text-xs line-clamp-2">{item.prompt}</div>
                    <button
                      onClick={() => handleDownload(item)}
                      className="mt-2 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[11px] font-medium hover:bg-background transition"
                    >
                      <Download className="h-3 w-3" />
                      Baixar
                    </button>
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
