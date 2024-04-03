import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pxtovw from "postcss-px-to-viewport";
import postCssConfig from "./postcss.config.js";
import tailwindcss from "tailwindcss";
// 按需导入element
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8080,
		host: "0.0.0.0",
	},
	css: {
		postcss: {
			plugins: [tailwindcss, pxtovw(postCssConfig)],
		},
		preprocessorOptions: {
			scss: {
				// 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
				additionalData: '@import "@/color.scss";',
			},
		},
	},
});
