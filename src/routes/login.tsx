import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — VisionAI" },
      { name: "description", content: "Entre na VisionAI para criar vídeos com IA." },
    ],
  }),
});

function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha email e senha.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Bem-vindo de volta!");
          router.navigate({ to: "/" });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Verifique seu email para confirmar o cadastro.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Erro ao entrar com Google.");
      }
      if (result.redirected) {
        return;
      }
      toast.success("Bem-vindo!");
      router.navigate({ to: "/" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[color:var(--neon-violet)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[color:var(--neon-blue)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-[color:var(--neon-pink)] opacity-15 blur-[90px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 1, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">VisionAI</span>
        </div>

        {/* Card */}
        <div className="rounded-3xl glass p-6 sm:p-8 glow">
          <h1 className="text-center font-display text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Bem-vindo de volta" : "Criar conta"}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {mode === "login"
              ? "Entre para continuar criando vídeos com IA."
              : "Cadastre-se e comece a criar vídeos cinematográficos."}
          </p>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm font-medium transition hover:bg-background disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Entrar com Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou use email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm text-foreground outline-none ring-0 transition focus:border-[color:var(--neon-violet)] focus:ring-1 focus:ring-[color:var(--neon-violet)]"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-border bg-background/60 py-2.5 pl-10 pr-10 text-sm text-foreground outline-none ring-0 transition focus:border-[color:var(--neon-violet)] focus:ring-1 focus:ring-[color:var(--neon-violet)]"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-primary-foreground glow disabled:opacity-50"
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Toggle mode */}
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {mode === "login" ? (
              <>
                Ainda não tem conta?{" "}
                <button onClick={() => setMode("register")} className="text-[color:var(--neon-violet)] hover:underline">
                  Cadastre-se
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button onClick={() => setMode("login")} className="text-[color:var(--neon-violet)] hover:underline">
                  Entrar
                </button>
              </>
            )}
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition">
            ← Voltar ao início
          </a>
        </div>
      </motion.div>
    </main>
  );
}
