import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "prisma",
    setupFiles: ["vitest-environment-prisma"],
  },
});
