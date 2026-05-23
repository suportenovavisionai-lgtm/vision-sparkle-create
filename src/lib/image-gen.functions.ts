import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  prompt: z.string().min(1).max(2000),
  styleSuffix: z.string().max(500).optional().default(""),
  imageDataUrl: z.string().max(15_000_000).optional(),
});

export const generateImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { imageUrl: null as string | null, error: "LOVABLE_API_KEY ausente." };
    }

    const fullPrompt = data.styleSuffix
      ? `${data.prompt}\n\nEstilo: ${data.styleSuffix}`
      : data.prompt;

    const content: any[] = [{ type: "text", text: fullPrompt }];
    if (data.imageDataUrl) {
      content.push({ type: "image_url", image_url: { url: data.imageDataUrl } });
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content }],
          modalities: ["image", "text"],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        if (res.status === 429) return { imageUrl: null, error: "Limite atingido. Tente novamente em instantes." };
        if (res.status === 402) return { imageUrl: null, error: "Créditos esgotados. Adicione créditos no Lovable AI." };
        return { imageUrl: null, error: `Falha ao gerar (${res.status}).` };
      }

      const json: any = await res.json();
      const url: string | undefined =
        json?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!url) {
        return { imageUrl: null, error: "A IA não retornou imagem." };
      }
      return { imageUrl: url, error: null };
    } catch (e) {
      console.error("Image gen failed:", e);
      return { imageUrl: null, error: "Erro inesperado ao gerar imagem." };
    }
  });
