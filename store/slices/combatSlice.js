import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { reviver } from "../../components/Battle/helpers/instanceReplacerAndReviver";

const initialState = {
	roster: [],
	round: 1,
	activePlayers: [0],
	waiting: [],
};

export const combatSlice = createSlice({
	name: "combatSlice",
	initialState,
	reducers: {
		setRoster: (state, action) => {
			state.roster = JSON.parse(action.payload);
		},
		clearRoster: (state) => {
			state.roster = [];
		},
		addActivePlayers: (state, action) => {
			const playerIndex = action.payload;
			if (!state.activePlayers.includes(playerIndex)) {
				state.activePlayers.push(playerIndex);
			} else {
				return;
			}
		},
		removeActivePlayer: (state, action) => {
			const playerIndex = action.payload;
			if (current(state.activePlayers).includes(playerIndex)) {
				const filtered = state.activePlayers.filter(
					(e) => e !== playerIndex,
				);
				state.activePlayers = filtered;
			}
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.combatSlice,
			};
		},
	},
});

export const { setRoster, clearRoster, removeActivePlayer, addActivePlayers } =
	combatSlice.actions;
// Select states
export const selectRoster = (state) => state.combatSlice.roster;
export const selectRound = (state) => state.combatSlice.round;
export const selectActivePlayers = (state) => state.combatSlice.activePlayers;
export const selectWaiting = (state) => state.combatSlice.waiting;
//--
export default combatSlice.reducer;
