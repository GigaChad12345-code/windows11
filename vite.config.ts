import { defineConfig } from "vite";
// Batches the agent's parallel file writes into ONE live update (see hmr-gate.mjs).
import { hmrGate } from "./hmr-gate.mjs";
// Same-origin proxy to pre.dev AI: the browser calls /predev-ai/*, the key stays on the server (see predev-ai.mjs).
import { predevAi } from "./predev-ai.mjs";

// Plain static site: index.html + style.css + script.js (no framework, no TS).
export default defineConfig({
  plugins: [hmrGate(), predevAi()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
