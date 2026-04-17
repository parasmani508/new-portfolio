import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-query"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":  ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-ui":     ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "@radix-ui/react-toast", "@radix-ui/react-label", "@radix-ui/react-slot"],
          "vendor-query":  ["@tanstack/react-query"],
          "vendor-misc":   ["react-markdown", "lucide-react", "sonner"],
        },
      },
    },
  },
});
