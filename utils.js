import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#000000",
			dark: "#6F0B38",
			contrastText: '#fff'
		},
		secondary: {
			main: "#D4C25E",
			contrastText: "#28240b",
		},
		custom:{
			main: '#1565c0',
			dark: '#212121',
			contrastText: '#fff'
		},
		divider: "#ECE4B7",
	},
	typography: {
		fontFamily: ["Eb Garamond, sans-serif"].join(","),
	},
	components: {
		// MuiCssBaseline: {
		// 	styleOverrides: {
		// 		"@global": {
		// 			"@font-face": ["eb-garamond"],
		// 		},
		// 	},
		// },
	},
});
