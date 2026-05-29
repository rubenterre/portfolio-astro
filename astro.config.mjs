// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rubenterre.me",
  output: "static",
  integrations: [svelte(), sitemap()],
  adapter: netlify(),
});
