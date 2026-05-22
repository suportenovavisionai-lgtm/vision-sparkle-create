import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          <span className="font-display font-semibold">VisionAI</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} VisionAI · Vídeos cinematográficos com IA</p>
      </div>
    </footer>
  );
}
