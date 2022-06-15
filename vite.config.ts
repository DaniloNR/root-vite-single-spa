import { defineConfig, loadEnv, UserConfigExport } from "vite";
import handlebars from "vite-plugin-handlebars";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const config: UserConfigExport = {
    base: "./",
    root: "./src",
    server: {
      port: 9000,
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: "./src/index.html",
          "root-config": "./src/root-config.ts",
        },
        output: {
          format: "module",
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          globals: {
            vue: "Vue",
          },
        },
        preserveEntrySignatures: "strict",
        external: ["vue", "single-spa"],
      },
    },
    define: {
      define: "undefined",
      "global.TYPED_ARRAY_SUPPORT": undefined,
    },
    plugins: [
      handlebars({
        context: {
          isLocal: mode === "development",
          ...env,
        },
      }),
      dynamicImport(),
    ],
  };

  return config;
});
