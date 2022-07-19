import { useId } from "react"
import { FormattedMessage } from "react-intl"
import tw, { screen } from "twin.macro"
import { Button } from "./components/Button"
import { Logo } from "./components/Logo"
import { Switch } from "./components/Switch"
import { useAction, useSelect } from "./store"
import { LocaleType, supports } from "./store/i18n/languages"

export const screenHelper = <div css={screen`sm`({ fontSize: "52px" })} />

function BaseButton(props: JSX.IntrinsicElements["button"]) {
	return <button {...props} />
}

const StyledButton = tw(BaseButton)`
py-2 rounded-3xl ring-4 transition ring-offset-2
bg-red-700/70 text-white ring-offset-gray-500
hover:(bg-red-500 ring-offset-red-400/50)`

export function Main() {
	return (
		<div
			css={[
				tw`flex flex-col items-center justify-center h-screen`,
				tw`bg-gradient-to-b from-blue-900 to-blue-400 content-around`,
			]}
		>
			<svg />
			<div tw="flex flex-col justify-center h-full space-y-5">
				<Button isPrimary>Submit</Button>
				<Button isSecondary>Cancel</Button>
				<Button isSmall>Close</Button>
				<StyledButton>Styled</StyledButton>
				<Control />
			</div>
			<Dropdown />
			<DeviceMode />
			<Language />
			<Logo />
		</div>
	)
}

function Control() {
	const id = useId()
	return (
		<div tw="flex">
			<label htmlFor={id} tw="self-center select-none text-white mr-3">
				Enabled
			</label>
			<Switch id={id} />
		</div>
	)
}

function DeviceMode() {
	const mode = useSelect(state => state.app.mode)
	return <div tw="text-gray-700 md:text-pink-300 lg:text-blue-300">screen: {mode}</div>
}

function Language() {
	const { setLocale } = useAction().intl
	return (
		<div tw="my-10 flex flex-col text-gray-800">
			<div tw="font-semibold text-center mb-4">
				<FormattedMessage id="language" />
			</div>
			<div tw="flex gap-5 items-center justify-center">
				{Object.entries<string>(supports).map(([k]) => (
					<button
						tw="bg-indigo-400 hover:(bg-indigo-500 text-white) px-4 py-1 rounded-lg"
						key={k}
						onClick={() => setLocale(k as LocaleType)}
					>
						{supports[k]}
					</button>
				))}
			</div>
		</div>
	)
}

function Dropdown() {
	return (
		<div aria-label="dropdown demo" tw="p-3 mb-6">
			<div
				tw="relative"
				className="
				dropdown
				//dropdown-open
				//dropdown-hover
			"
			>
				<button tabIndex={0} type="button" tw="rounded-lg bg-cyan-500 hover:bg-cyan-600 px-4 py-3 text-white">
					Dropdown
				</button>
				<div
					className="dropdown-content"
					tw="
						dropdown:(mt-3 absolute z-50 shadow-2xl origin-top duration-200)
						dropdown:(invisible opacity-0 scale-95)
						dropdown-show:(visible opacity-100 scale-100)
					"
				>
					<ul tw="w-48 p-3 rounded-lg bg-slate-50" tabIndex={0}>
						<li>
							<button type="button" tw="w-full text-left bg-pink-200 hover:bg-pink-300  px-4 py-2">
								Item 1
							</button>
						</li>
						<li>
							<button type="button" tw="w-full text-left bg-green-200 hover:bg-green-300  px-4 py-2">
								Item 2
							</button>
						</li>
						<li>
							<button type="button" tw="w-full text-left bg-yellow-200 hover:bg-yellow-300  px-4 py-2">
								Item 3
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
