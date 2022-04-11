import { ThemeProvider } from "@emotion/react"
import { PropsWithChildren } from "react"
import { QueryClientProvider } from "react-query"
import { useSelect } from "~/store"
import { LocaleProvider, StoreProvider } from "~/store/Provider"
import AppMain from "./AppMain"

function ReactQueryProvider({ children }: PropsWithChildren<{}>) {
	const queryClient = useSelect(state => state.app.queryClient)
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default function App() {
	return (
		<StoreProvider>
			<LocaleProvider>
				<ReactQueryProvider>
					<ThemeProvider theme={{ colors: { primary: "#abcaca9f" } }}>
						<AppMain />
					</ThemeProvider>
				</ReactQueryProvider>
			</LocaleProvider>
		</StoreProvider>
	)
}
