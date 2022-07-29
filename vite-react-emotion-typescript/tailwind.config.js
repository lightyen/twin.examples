const esbuild = require("esbuild")
const Module = require("node:module")

const result = esbuild.buildSync({
	entryPoints: ["./tailwind.config.ts"],
	bundle: true,
	platform: "node",
	write: false,
})

const mod = new Module("")
mod._compile(new TextDecoder().decode(result.outputFiles[0].contents), "")
module.exports = mod.exports.default
