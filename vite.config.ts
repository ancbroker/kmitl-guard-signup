import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Dev-only proxy to bypass CORS for the remote PHP endpoint
      '/third_party_save': {
        target: 'http://localhost:8121',
        changeOrigin: true,
        secure: false,
        // Support calling either /third_party_save or /third_party_save.php (ignore extra slashes/query)
        rewrite: (p) => '/php/third_party_save.php',
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Inject permissive CORS so browser can read body
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          });
        }
      },
      // Proxy local service PHP endpoints so they execute under Apache/XAMPP instead of being served as raw text by Vite
      '/service': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        // Map /service/... to the actual project subfolder under Apache document root
        rewrite: (p) => p.replace(/^\/service/, '/anc/prakun.com/kmitl-guard-signup/service'),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
