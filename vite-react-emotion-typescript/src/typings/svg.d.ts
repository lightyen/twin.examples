declare module "*.svg" {
	const src: string
	export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
	export default src
}
