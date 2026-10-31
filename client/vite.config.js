import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import https from "node:https";

function ttsDevPlugin() {
  return {
    name: "tts-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/tts", (req, res) => {
        try {
          const parsed = new URL(req.url, "http://127.0.0.1:5173");
          const text = parsed.searchParams.get("text") || parsed.searchParams.get("q") || "";
          if (!text) {
            res.statusCode = 400;
            return res.end("Text is required");
          }
          const encoded = encodeURIComponent(String(text).slice(0, 200));
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encoded}`;

          https.get(
            googleUrl,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              },
            },
            (gRes) => {
              res.setHeader("Content-Type", "audio/mpeg");
              res.setHeader("Cache-Control", "public, max-age=86400");
              res.setHeader("Access-Control-Allow-Origin", "*");
              gRes.pipe(res);
            }
          ).on("error", (err) => {
            res.statusCode = 500;
            res.end("TTS proxy error: " + err.message);
          });
        } catch (e) {
          res.statusCode = 500;
          res.end("TTS handler error: " + e.message);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), ttsDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
