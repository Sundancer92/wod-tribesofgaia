import "../styles/globals.css";
import "@fontsource/eb-garamond";

// Theme MUI
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils";
// Redux TLK
import { Provider } from "react-redux";
import { wrapper } from "../store/store";

import Layout from "../components/Layout/Layout";

function MyApp({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	const { pageProps } = props;
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ThemeProvider>
	);
}

export default MyApp;
