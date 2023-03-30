import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": "./src",
      types: "./src/types.d.ts",
      layouts: "./src/layouts",
      contexts: "./src/contexts",
      components: "./src/components",
    },
  },
});
