import tw, { theme, screen } from "twin.macro"

theme

screen

tw`modal  bg-red-500 `

tw.div

tw.div` `

function A({ nice }: { nice?: boolean }) {
	return <div></div>
}

const B = tw(A)`bg-black`

export function Main() {
	return (
		<div tw="p-3 bg-black h-screen">
			<B />
			<div>
				<span tw="content-['ab\tab'] divide-black container"></span>
				<span tw='content-["ab\tab"]'></span>
				<span tw={"content-['ab\tab']"}></span>
				<span tw={'content-["ab\tab"]'}></span>
				<span tw={`content-['ab\tab']`}></span>
				<span tw={`content-["ab\tab"]`}></span>
			</div>
		</div>
	)
}
