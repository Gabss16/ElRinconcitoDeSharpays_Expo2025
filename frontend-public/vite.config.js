import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // <- asegúrate de no excluir sweetalert2
    },
  },
  optimizeDeps: {
    include: ["sweetalert2"], // 🔥 fuerza que Vite lo incluya
  },
});
