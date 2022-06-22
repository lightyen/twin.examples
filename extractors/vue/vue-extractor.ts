import { Node, parse, TemplateChildNode } from "@vue/compiler-dom"

export default {
	acceptLanguage(languageId: string) {
		return languageId === "vue"
	},
	find(languageId: string, code: string, position: number, includeEnd: boolean, jsxPropImportChecking: boolean, { console, typescriptExtractor }) {
		// console.info(position)
		const result = parse(code)
		const _find = (languageId: "typescript" | "javascript", node: TemplateChildNode) => {
			const offset = node.loc.start.offset
			const e = typescriptExtractor.find(
				languageId,
				node.loc.source,
				position - offset,
				includeEnd,
				jsxPropImportChecking,
			)

			if (e) {
				e.start += offset
				e.end += offset
			}
			return e
		}

		for (const child of result.children) {
			if (child.type === 1) {
				if (child.tag === "script" && !child.isSelfClosing) {
					if (child.props.length === 0 && inRange) {
						for (const c of child.children) {
							if (inRange(c)) return _find("javascript", c)
						}
					} else {
						let languageId: "javascript" | "typescript" | null = "javascript"
						for (let i = 0; i < child.props.length; i++) {
							const prop = child.props[i]
							if (prop.type === 6) {
								if (prop.name === "lang") {
									if (prop.value?.content) {
										languageId = prop.value.content === "ts" ? "typescript" : null
									} else {
										languageId = "javascript"
									}
								}
							}
						}
						if (languageId) {
							for (const c of child.children) {
								if (inRange(c)) return _find(languageId, c)
							}
						}
					}
				}
			}
		}

		return undefined

		function inRange(node: Node) {
			return position > node.loc.start.offset && position <= node.loc.end.offset
		}
	},
	findAll(languageId: string, code: string, jsxPropImportChecking: boolean, { typescriptExtractor }) {
		const result = parse(code)
		const children: { languageId: "javascript" | "typescript"; targets: TemplateChildNode[] }[] = []
		for (const child of result.children) {
			if (child.type === 1) {
				if (child.tag === "script" && !child.isSelfClosing) {
					if (child.props.length === 0) {
						children.push({ languageId: "javascript", targets: child.children })
					} else {
						let languageId: "javascript" | "typescript" | null = "javascript"
						for (let i = 0; i < child.props.length; i++) {
							const prop = child.props[i]
							if (prop.type === 6) {
								if (prop.name === "lang") {
									if (prop.value?.content) {
										languageId = prop.value.content === "ts" ? "typescript" : null
									} else {
										languageId = "javascript"
									}
								}
							}
						}
						if (languageId) {
							children.push({ languageId, targets: child.children })
						}
					}
				}
			}
		}

		return children
			.map(({ targets, languageId }) =>
				targets
					.map(node => {
						const offset = node.loc.start.offset
						const tokens = typescriptExtractor
							.findAll(languageId, node.loc.source, jsxPropImportChecking)
							.map(t => {
								t.start += offset
								t.end += offset
								return t
							})
						return tokens
					})
					.flat(),
			)
			.flat()
	},
}
