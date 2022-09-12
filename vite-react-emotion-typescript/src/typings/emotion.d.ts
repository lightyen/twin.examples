// @emotion/react

import { CSSObject, Interpolation, PropsOf, Theme } from "@emotion/react"
import { StyledComponent, StyledOptions } from "@emotion/styled"
import { FilteringStyledOptions } from "@emotion/styled/types/base"

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
	/**
	 * @typeparam ComponentProps  Props which will be included when withComponent is called
	 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
	 */
	export interface CreateStyledComponent<
		ComponentProps extends {},
		SpecificComponentProps extends {} = {},
		JSXProps extends {} = {},
	> {
		/**
		 * @typeparam AdditionalProps  Additional props to add to your styled component
		 */
		<AdditionalProps extends {} = {}>(
			...styles: Array<
				Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: Theme }>
			>
		): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>

		(template: TemplateStringsArray): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>

		/**
		 * @typeparam AdditionalProps  Additional props to add to your styled component
		 */
		<AdditionalProps extends {}>(template: TemplateStringsArray): StyledComponent<
			ComponentProps & AdditionalProps,
			SpecificComponentProps,
			JSXProps
		>
	}

	export interface CreateStyled {
		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<
			C extends React.ComponentClass<React.ComponentProps<C>>,
			ForwardedProps extends keyof React.ComponentProps<C> & string = keyof React.ComponentProps<C> & string,
		>(
			component: C,
			options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
		): CreateStyledComponent<
			Pick<PropsOf<C>, ForwardedProps> & {
				theme?: Theme
			},
			{},
			{
				ref?: React.Ref<InstanceType<C>>
			}
		>

		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)<Props>(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<C extends React.ComponentClass<React.ComponentProps<C>>>(
			component: C,
			options?: StyledOptions<React.ComponentProps<C>>,
		): CreateStyledComponent<
			PropsOf<C> & {
				theme?: Theme
			},
			{},
			{
				ref?: React.Ref<InstanceType<C>>
			}
		>

		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<
			C extends React.ComponentType<React.ComponentProps<C>>,
			ForwardedProps extends keyof React.ComponentProps<C> & string = keyof React.ComponentProps<C> & string,
		>(
			component: C,
			options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
		): CreateStyledComponent<
			Pick<PropsOf<C>, ForwardedProps> & {
				theme?: Theme
			}
		>

		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<C extends React.ComponentType<React.ComponentProps<C>>>(
			component: C,
			options?: StyledOptions<React.ComponentProps<C>>,
		): CreateStyledComponent<
			PropsOf<C> & {
				theme?: Theme
			}
		>

		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<
			Tag extends keyof JSX.IntrinsicElements,
			ForwardedProps extends keyof JSX.IntrinsicElements[Tag] & string = keyof JSX.IntrinsicElements[Tag] &
				string,
		>(
			tag: Tag,
			options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>,
		): CreateStyledComponent<
			{ theme?: Theme; as?: React.ElementType },
			Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
		>

		/**
		 * @desc
		 * This function accepts a React component or tag ('div', 'a' etc).
		 *
		 * @example tw(MyComponent)`w-full`
		 * @example tw(MyComponent)(myComponentProps => ({ width: myComponentProps.width }))
		 * @example tw('div')`w-full`
		 * @example tw('div')<Props>(props => ({ width: props.width }))
		 */
		<Tag extends keyof JSX.IntrinsicElements>(
			tag: Tag,
			options?: StyledOptions<JSX.IntrinsicElements[Tag]>,
		): CreateStyledComponent<{ theme?: Theme; as?: React.ElementType }, JSX.IntrinsicElements[Tag]>
	}

	export type StyledTags = {
		[Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
			{
				theme?: Theme
				as?: React.ElementType
			},
			JSX.IntrinsicElements[Tag]
		>
	}

	interface CreateStyledTw extends StyledTags, CreateStyled {
		(arr: TemplateStringsArray): CSSObject
	}

	const tw: CreateStyledTw
	export default tw

	export { css, keyframes } from "@emotion/react"
	export { default as styled } from "@emotion/styled"

	export function screen(arr: TemplateStringsArray): (arg: CSSObject) => CSSObject
	export function screen(str: string): (arg: CSSObject) => CSSObject

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function theme<T>(arr: TemplateStringsArray): any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export function theme<T>(str: string): any

	export function GlobalStyles(): JSX.Element

	export const globalStyles: CSSObject
}
