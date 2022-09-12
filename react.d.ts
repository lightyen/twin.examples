// Base types for react

import {} from "react"

declare module "react" {
	interface Attributes {
		/** twin.macro */
		tw?: string

		/**
		 * twin.macro
		 * @deprecated
		 */
		cs?: string
	}
}

declare module "twin.macro" {
	export interface CSSObject {
		[key: string]: string | number | CSSObject
	}

	export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
		JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>

	export interface TwComponent<
		ComponentProps extends unknown = {},
		SpecificComponentProps extends {} = {},
		JSXProps extends {} = {},
	> extends React.FunctionComponent<ComponentProps & SpecificComponentProps & JSXProps> {}

	export interface CreateTwComponent<
		ComponentProps extends unknown,
		SpecificComponentProps extends {} = {},
		JSXProps extends {} = {},
	> {
		(template: TemplateStringsArray): TwComponent<ComponentProps, SpecificComponentProps, JSXProps>
	}

	export interface TwWrapper {
		<C extends React.ComponentClass<React.ComponentProps<C>>>(component: C): CreateTwComponent<
			PropsOf<C>,
			{},
			{
				ref?: React.Ref<InstanceType<C>>
			}
		>

		<C extends React.ComponentType<React.ComponentProps<C>>>(component: C): CreateTwComponent<PropsOf<C>>

		<Tag extends keyof JSX.IntrinsicElements>(tag: Tag): CreateTwComponent<{}, JSX.IntrinsicElements[Tag]>
	}

	export type TwTags = {
		[Tag in keyof JSX.IntrinsicElements]: CreateTwComponent<{}, JSX.IntrinsicElements[Tag]>
	}

	interface TwInterface extends TwTags, TwWrapper {
		(arr: TemplateStringsArray): CSSObject
	}

	const tw: TwInterface
	export default tw

	export function screen(arr: TemplateStringsArray): (arg: CSSObject) => CSSObject
	export function screen(str: string): (arg: CSSObject) => CSSObject

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function theme<T>(arr: TemplateStringsArray): any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function theme<T>(str: string): any

	export function GlobalStyles(): JSX.Element

	export const globalStyles: CSSObject
}
