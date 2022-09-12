import yaml from "@rollup/plugin-yaml"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig, PluginOption } from "vite"
import eslint from "vite-plugin-eslint"
import svg from "vite-plugin-svgr"
import tsConfigPaths from "vite-plugin-tsconfig-paths"

export default defineConfig(({}) => ({
	plugins: [
		svg({ exportAsDefault: true }),
		yaml() as PluginOption,
		eslint(),
		tsConfigPaths({ tsConfigPath: path.resolve(__dirname, "src", "tsconfig.json") }),
		react({
			babel: {
				plugins: ["macros", "styled-components"],
			},
		}),
	],
	build: {
		target: ["es2020"],
	},
	optimizeDeps: {
		esbuildOptions: {
			target: "es2020",
		},
	},
	esbuild: {
		logOverride: { "this-is-undefined-in-esm": "silent" },
	},
}))
