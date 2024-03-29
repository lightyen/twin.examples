import yaml from "@rollup/plugin-yaml"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"
import svg from "vite-plugin-svgr"
import tsConfigPaths from "vite-plugin-tsconfig-paths"

export default defineConfig(({}) => ({
	plugins: [
		svg(),
		yaml(),
		eslint(),
		tsConfigPaths({ tsConfigPath: path.resolve(__dirname, "src", "tsconfig.json") }),
		react({
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion", "macros"],
			},
		}),
	],
	esbuild: {
		logOverride: { "this-is-undefined-in-esm": "silent" },
	},
}))
