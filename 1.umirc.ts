import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/semi", component: "semi/index" },

  ],
  npmClient: 'npm',
});
