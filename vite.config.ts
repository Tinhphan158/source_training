/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import checker from "vite-plugin-checker";

const buildInfoPlugin = require("./plugin/buildInfo");
const addVersionTime = require("./plugin/versionTime");
const version = process.env.npm_package_version;
const name = process.env.npm_package_name;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  esbuild: {
    // drop: ['console', 'debugger'], // comment when environment dev, staging and uncomment when environment uat, live
  },
  build: {
    outDir: path.join(__dirname, "build"),
    rollupOptions: {
      output: {
        esModule: true,
        validate: true,
      },
      cache: true,
    },
    manifest: true,
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
  },

  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    splitVendorChunkPlugin(),
    addVersionTime(version),
    buildInfoPlugin(version, name),
  ],
  server: {
    port: 8000,
    host: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
