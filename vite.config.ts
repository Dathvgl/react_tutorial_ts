import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const port: number = parseInt(process.env.VITE_PORT);

  return defineConfig({
    plugins: [react()],
    server: {
      port: port,
      host: true,
      strictPort: true,
    },
    resolve: {
      alias: {
        "~": "/src",
        types: "/src/types.d.ts",
        hooks: "/src/hooks",
        layouts: "/src/layouts",
        contexts: "/src/contexts",
        components: "/src/components",
      },
    },
    envPrefix: ["VITE_"],
  });
};
