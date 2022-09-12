import tw, { styled } from "twin.macro"

interface SidebarItemProps {
	exact?: boolean
}

tw`modal  bg-red-500 `

const SidebarItem = styled("a")<SidebarItemProps>(({ exact }) => {
	return [
		tw`flex items-center p-2 text-base font-normal rounded-lg text-zinc-900 hover:bg-zinc-100`,
		{
			".dark &": {
				"--tw-text-opacity": "1",
				color: "rgb(255 255 255 / var(--tw-text-opacity))",
				"&:hover": {
					"--tw-bg-opacity": "1",
					backgroundColor: "rgb(63 63 70 / var(--tw-bg-opacity))",
				},
			},
		},
		exact && tw`dark:bg-yellow-700`,
	]
})

export function Main() {
	return (
		<div tw="p-3 bg-black h-screen">
			<div className="dark">
				<SidebarItem>Text</SidebarItem>
				<SidebarItem>Text</SidebarItem>
				<SidebarItem exact>Text</SidebarItem>
				<SidebarItem>Text</SidebarItem>
			</div>
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
