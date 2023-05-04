import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
//Slices
import { combatSlice } from "./slices/combatSlice";

const makeStore = () =>
	configureStore({
		reducer: {
			[combatSlice.name]: combatSlice.reducer,
		},
		devTools: true,
	});

export const wrapper = createWrapper(makeStore);
