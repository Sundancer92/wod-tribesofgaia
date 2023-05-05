import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { reviver } from "../../components/Battle/helpers/instanceReplacerAndReviver";

const initialState = {
	roster: [],
	round: 1,
	activePlayers: [],
	ragePlayers: [],
	waiting: [],
	finished: [],
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
		addRagePlayers: (state, action) => {
			const playerIndex = action.payload;
			if (!state.ragePlayers.includes(playerIndex)) {
				state.ragePlayers.push(playerIndex);
			} else {
				return;
			}
		},
		removeRagePlayer: (state, action) => {
			const playerIndex = action.payload;
			if (current(state.ragePlayers).includes(playerIndex)) {
				const filtered = state.ragePlayers.filter((e) => e !== playerIndex);
				state.ragePlayers = filtered;
			}
		},
		setFinished: (state, action) => {
			const playerIndex = action.payload.index;
			const charIni = current(state.roster[playerIndex]).initiative;
			const activePlayers = current(state.activePlayers);
			const roster = current(state.roster);

			// Agrega el indice si debe a FINISHED
			if (
				!current(state.finished).includes(playerIndex) &&
				activePlayers.includes(playerIndex)
			) {
				state.finished.push(playerIndex);
				// console.log("state.FINSHED", current(state.finished));
			}
			// console.log(roster);
			// Prepara los siguientes jugadores por iniciativa
			if (activePlayers.length === 0) {
				const initiatives = roster.filter((c) => {
					return Number(c.initiative) < charIni;
				});

				// console.log("Iniciativas", initiatives);

				const nextInitiative = Math.max(
					...initiatives.map((i) => i.initiative),
				);
				// console.log("Siguiente iniciativa mas alta", nextInitiative);

				const newPlayers = [];

				// RECORRE ROSTER Y TRAE LAS COINCIDENCIAS DE SIGUIENTE INICIATIVA MAS ALTA
				for (let i = 0; i < roster.length; i++) {
					if (roster[i].initiative == nextInitiative) {
						// console.log(roster[i]);
						newPlayers.push(i);
					}
				}
				// console.log(activePlayers);
				state.activePlayers = newPlayers;
			}
			return;
		},
		setNextRound: (state) => {
			const rosterLength = current(state.roster).length;
			const finishedLength = current(state.finished).length;
			if (rosterLength === finishedLength) {
				state.finished = [];
				state.round = state.round + 1;
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

export const {
	setRoster,
	clearRoster,
	addActivePlayers,
	removeActivePlayer,
	addRagePlayers,
	removeRagePlayer,
	setFinished,
	setNextRound,
} = combatSlice.actions;
// Select states
export const selectRoster = (state) => state.combatSlice.roster;
export const selectRound = (state) => state.combatSlice.round;
export const selectActivePlayers = (state) => state.combatSlice.activePlayers;
export const selectWaiting = (state) => state.combatSlice.waiting;
export const selectFinished = (state) => state.combatSlice.finished;
export const selectRagePlayers = (state) => state.combatSlice.ragePlayers;
//--
export default combatSlice.reducer;
