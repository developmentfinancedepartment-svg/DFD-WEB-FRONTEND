import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import crypto from "crypto";

const chunkNameMap = new Map();
function hashChunkName(name) {
  if (!chunkNameMap.has(name)) {
    const hash = crypto.createHash("sha256").update(name).digest("hex").slice(0, 8);
    chunkNameMap.set(name, hash);
  }
  return chunkNameMap.get(name);
}

export default defineConfig(({ mode }) => {
  // ✅ Load .env variables at config time
  const env = loadEnv(mode, process.cwd(), "");

  const basePath = env.VITE_BASE_PATH || "/"; // fallback to "/" if not set
  const basePort = parseInt(env.VITE_PORT) || 80; // optionally also from .env

  return {
    plugins: [
      vue(),
      viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
      viteCompression({ algorithm: "gzip", ext: ".gz" }),
      VitePWA({
        workbox: {
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        },
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
        manifest: {
          name: "QA System",
          short_name: "SLSI",
          description:
            "The Import Inspection Scheme (II) of the Quality Assurance Division of Sri Lanka Standards Institution (SLSI) was implemented based on the Gazette Notification No. 2064/34 of 29 March 2018 under the Imports and Exports Control Act No. 1 of 1969. As per Section 6 of Gazette Notification No 2064/34, article(s) covered under regulations shall be assessed for conformity to Sri Lanka standards on the basis of relevant conformity assessment procedures and guidelines, laid down by the Director General of the Sri Lanka Standards Institution. The objective of the Compulsory Import Inspection Scheme (CIIS) is to assure that the imported products Gazette under this scheme designated in the relevant regulations are closely monitored and assessed the conformity to the relevant Sri Lanka Standard Specification (SLS) considering the risks associated with health, safety, and environment in order to make a recommendation to the Department of Sri Lanka Customs on the release of the consignments without unnecessary delays due to conformity assessment procedures. New Gazette Notification 2384/35",
          theme_color: "#000133",
          background_color: "#ffffff",
          display: "standalone",
          scope: basePath,
          start_url: basePath,
          icons: [
            { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ].filter(Boolean),

    base: '/dfd-web/',

    server: {
      port: basePort,
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    build: {
      sourcemap: false,
      minify: "terser",
      terserOptions: {
        compress: {
          //drop_console: true,
          //drop_debugger: true,
        },
        mangle: true,
      },
      rollupOptions: {
        output: {
          chunkFileNames: (chunkInfo) => {
            const hash = hashChunkName(chunkInfo.name);
            return `assets/${hash}.[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            const hash = hashChunkName(chunkInfo.name);
            return `assets/${hash}.[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const hash = crypto
              .createHash("sha256")
              .update(assetInfo.name ?? "asset")
              .digest("hex")
              .slice(0, 8);
            return `assets/${hash}.[hash][extname]`;
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const pkgName = id.split("node_modules/")[1].split("/")[0];
              return hashChunkName(pkgName);
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  };
});
