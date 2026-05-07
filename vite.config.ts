import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const viteEnv: Record<string, string> = {};
  for (const key of Object.keys(env)) {
    if (key.startsWith("VITE_")) {
      viteEnv[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    }
  }

  return {
    define: viteEnv,
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
      dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackStart({ target: "vercel" }),
      viteReact(),
    ],
  };
});
