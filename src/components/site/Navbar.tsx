import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">VisionAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Recursos</a>
          <a href="#styles" className="hover:text-foreground transition">Estilos</a>
          <a href="#showcase" className="hover:text-foreground transition">Exemplos</a>
          <a href="#pricing" className="hover:text-foreground transition">Planos</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition">Entrar</a>
          <a href="#cta" className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground glow">Começar</a>
        </div>
      </div>
    </header>
  );
}
