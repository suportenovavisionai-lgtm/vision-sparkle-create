import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Mic,
  Wand2,
  Plus,
  LogOut,
  Clock,
  Zap,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Painel — VisionAI" }],
  }),
});

function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da conta.");
    router.navigate({ to: "/login" });
  };

  const tools = [
    { icon: Video, title: "Texto → Vídeo", desc: "Gere cenas cinematográficas a partir de um prompt.", color: "var(--neon-violet)", to: "/video" as const },
    { icon: ImageIcon, title: "Foto Animada", desc: "Transforme imagens estáticas em vídeos vivos.", color: "var(--neon-blue)", to: "/create" as const },
    { icon: Mic, title: "Narração IA", desc: "Vozes realistas em múltiplos idiomas.", color: "var(--neon-pink)", to: "/create" as const },
    { icon: Wand2, title: "Auto Viral", desc: "IA otimiza seu vídeo para TikTok e Reels.", color: "var(--neon-violet)", to: "/video" as const },
  ];

  const stats = [
    { icon: Clock, label: "Créditos", value: "100" },
    { icon: Zap, label: "Vídeos gerados", value: "0" },
    { icon: TrendingUp, label: "Plano", value: "Free" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[color:var(--neon-violet)] opacity-10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[color:var(--neon-blue)] opacity-10 blur-[120px]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">VisionAI</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[200px]">{email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium hover:bg-background transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Vamos criar algo <span className="text-gradient">incrível</span> hoje?
          </h1>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl glass p-4 sm:p-5"
            >
              <s.icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-2 font-display text-xl sm:text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* New project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <Link
            to="/create"
            className="group flex w-full items-center justify-between rounded-2xl bg-brand px-5 py-4 text-left glow"
          >
            <div>
              <div className="font-display text-base sm:text-lg font-semibold text-primary-foreground">
                Gerar nova imagem com IA
              </div>
              <div className="text-xs text-primary-foreground/80">Escolha um preset e descreva sua visão.</div>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-background/20 transition group-hover:scale-110">
              <Plus className="h-5 w-5 text-primary-foreground" />
            </span>
          </Link>
        </motion.div>

        {/* Tools grid */}
        <h2 className="mt-10 font-display text-xl font-semibold tracking-tight">Ferramentas</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {tools.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={t.to}
                className="group relative block overflow-hidden rounded-2xl glass p-5 text-left transition hover:scale-[1.02]"
              >
                <div
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                  style={{ background: t.color }}
                />
                <div
                  className="relative grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: `color-mix(in oklab, ${t.color} 20%, transparent)` }}
                >
                  <t.icon className="h-5 w-5" style={{ color: t.color }} />
                </div>
                <div className="relative mt-4 font-display text-base font-semibold">{t.title}</div>
                <div className="relative mt-1 text-xs text-muted-foreground">{t.desc}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent projects */}
        <h2 className="mt-10 font-display text-xl font-semibold tracking-tight">Projetos recentes</h2>
        <div className="mt-4 rounded-2xl glass p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background/40">
            <Video className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Nenhum projeto ainda. Crie seu primeiro vídeo agora.</p>
        </div>
      </div>
    </main>
  );
}
