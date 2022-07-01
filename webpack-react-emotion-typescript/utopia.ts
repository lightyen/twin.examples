// https://utopia.fyi/type/calculator/?c=480,14,1.125,1300,16,1.125,10,3,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l

export default function utopia(config: Array<[string, number, number, number]>): Tailwind.Plugin {
	const fontSize: Record<string, Tailwind.FontSizeValue> = {}
	function variableName(minValue: number, maxValue: number) {
		return `--step-${minValue}〰️${maxValue}`.replace(/\./g, "_")
	}
	for (const [key, minValue, maxValue, lineHeight] of config) {
		fontSize[key] = [`var(${variableName(minValue, maxValue)})`, { lineHeight }]
	}
	return {
		config: {
			theme: {
				extend: {
					fontSize,
				},
			},
		},
		handler({ addBase }) {
			const rootFontSize = 16
			const minWidth = 480
			const maxWidth = 1300
			config.forEach(([, minValue, maxValue]) => {
				generateVariable(minValue, maxValue)
			})
			return
			function generateVariable(minValue: number, maxValue: number) {
				const style = {}
				style[variableName(minValue, maxValue)] = `clamp(${getStep(minValue, maxValue)})`
				addBase({ ":root": style })
				function getStep(minFontSize: number, maxFontSize: number) {
					const m = minFontSize / rootFontSize
					const n = maxFontSize / rootFontSize
					const a = (maxFontSize - minFontSize) / (maxWidth - minWidth)
					const c = minFontSize - minWidth * a
					return `${m}rem, ${c / rootFontSize}rem + ${100 * a}vw, ${n}rem`
				}
			}
		},
	}
}
