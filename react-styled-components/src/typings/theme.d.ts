declare global {
	declare module "styled-components" {
		export interface DefaultTheme {
			colors: {
				/** primary */
				primary: string
			}
		}
	}
}
