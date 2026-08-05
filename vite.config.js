import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // Prevent Lightning CSS from changing the working CSS behavior.
    cssMinify: false,

    // Keep all styles in one predictable CSS file.
    cssCodeSplit: false,
  },
});
