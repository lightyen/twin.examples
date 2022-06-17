export default {
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
	plugins: [
		function ({ addVariant }) {
			addVariant("dropdown", ".dropdown &")
			addVariant("dropdown-show", [
				".dropdown.dropdown-open &",
				".dropdown.dropdown-hover:hover &",
				".dropdown:not(.dropdown-hover):focus &",
				".dropdown:not(.dropdown-hover):focus-within &",
			])
		},
		function ({ matchComponents, matchUtilities, theme }) {
			matchUtilities(
				{
					tab(value) {
						return {
							tabSize: value,
						}
					},
				},
				{ values: {} },
			)
			matchComponents(
				{
					"test-bg"(value) {
						return {
							"&.test": {
								backgroundColor: value,
							},
						}
					},
				},
				{ values: theme("colors.cyan") },
			)
		},
	],
} as Tailwind.ConfigJS
