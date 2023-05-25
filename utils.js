import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#bf9304",
			dark: "#8d6d03",
			light: "#fac415",
			contrastText: "#100d00",
		},
		secondary: {
			main: "#3D3A4B",
			dark: "#22202a",
			light: "#736d8d",
			contrastText: "#fff",
		},
		warning: {
			main: "#5E747F",
			dark: "#5e6c7f",
			light: "#5e7c7f",
			contrastText: "#fff",
		},
		success: {
			main: "#5d93ea",
			dark: "#0f3674",
			light: "#8d011d",
			contrastText: "#fff",
		},
		error: {
			main: "#8D0801",
			dark: "#8d2b01",
			light: "#fe372c",
			contrastText: "#fff",
		},
		info: {
			main: "#EFF1ED",
			dark: "#2b3025",
			light: "#f9faf8",
			contrastText: "#040403",
		},
		// ORIGINAL
		// primary: {
		// 	main: "#000000",
		// 	dark: "#6F0B38",
		// 	contrastText: "#fff",
		// },
		// secondary: {
		// 	main: "#D4C25E",
		// 	contrastText: "#28240b",
		// },
		custom: {
			main: "#1565c0",
			dark: "#212121",
			contrastText: "#fff",
		},
		// divider: "#8d0801",
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
