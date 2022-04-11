import { Global } from "@emotion/react"
import CascadiaCode from "assets/fonts/CascadiaCode.ttf"
import CascadiaCodeItalic from "assets/fonts/CascadiaCodeItalic.ttf"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import tw, { css, GlobalStyles } from "twin.macro"
import App from "./App"

const Cascadia = css`
	@font-face {
		font-family: "Cascadia Code";
		font-style: normal;
		font-display: swap;
		src: local("Cascadia Code"), url(${CascadiaCode}) format("opentype");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
			U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: "Cascadia Code";
		font-style: italic;
		font-display: swap;
		src: local("Cascadia Code"), url(${CascadiaCodeItalic}) format("opentype");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
			U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
`

const globalStyle = css`
	body {
		${tw`m-0 leading-normal overflow-hidden bg-gray-900 font-sans`}
	}
	button:-moz-focusring,
	[type="button"]:-moz-focusring,
	[type="reset"]:-moz-focusring,
	[type="submit"]:-moz-focusring {
		outline: none;
	}
`

const rootEl = document.getElementById("root")
if (rootEl) {
	const root = createRoot(rootEl)
	root.render(
		<StrictMode>
			<GlobalStyles />
			<Global styles={[Cascadia, globalStyle]} />
			<App />
		</StrictMode>,
	)
}
