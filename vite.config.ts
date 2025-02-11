import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/stable-coin-price-widget/", // Replace 'stable-coin-price-widget' with your repository name
});
