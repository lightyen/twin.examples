import utopia from "./utopia"

export default {
	plugins: [
		utopia([
			["xxs", 9.83, 11.24, 1.5],
			["xs", 11.06, 12.64, 1.5],
			["sm", 12.44, 14.22, 1.5],
			["base", 14.0, 16.0, 1.5],
			["lg", 15.75, 18.0, 1.5],
			["xl", 17.72, 20.25, 1.5],
			["2xl", 19.93, 22.78, 1.5],
			["3xl", 22.43, 25.63, 1.5],
			["4xl", 25.23, 28.83, 1.5],
			["5xl", 28.38, 32.44, 1.5],
			["6xl", 31.93, 36.49, 1.5],
			["7xl", 35.92, 41.05, 1.5],
			["8xl", 40.41, 46.18, 1.5],
			["9xl", 45.46, 51.96, 1.5],
		]),
		function ({ addVariant }) {
			addVariant("dropdown", ".dropdown &")
			addVariant("dropdown-show", [
				".dropdown.dropdown-open &",
				".dropdown.dropdown-hover:hover &",
				".dropdown:not(.dropdown-hover):focus &",
				".dropdown:not(.dropdown-hover):focus-within &",
			])
		},
	],
	theme: {
		extend: {
			colors: {
				electric: "#db00ff",
				ribbon: "#0047ff",
			},
			fontFamily: {
				sans: [
					"Cascadia Code",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Taipei Sans TC Beta",
					"Noto Sans",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
			},
		},
	},
} as Tailwind.ConfigJS
