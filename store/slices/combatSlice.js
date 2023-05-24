import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	round: 0,
	roster: [],
	initiativeList: [],
	highestInitiative: "",
	battleInProgress: false,
	disabledCombatants: [],
	waiting: [],
	finished: [],
};

export const combatSlice = createSlice({
	name: "combatSlice",
	initialState,
	reducers: {
		addDisabledCombatants: (state, action) => {
			state.disabledCombatants.push(action.payload);
		},
		removeDisabledCombatant: (state, action) => {
			const combatantIndex = action.payload;

			if (current(state.disabledCombatants).includes(combatantIndex)) {
				const filtered = state.disabledCombatants.filter(
					(e) => e !== combatantIndex,
				);
				state.disabledCombatants = filtered;
			}
		},
		setHighestInitiative: (state, action) => {
			state.highestInitiative = action.payload;
		},
		toogleBattleInProgress: (state) => {
			state.battleInProgress = !state.battleInProgress;
		},
		setInitiativeList: (state, action) => {
			state.initiativeList = action.payload;
		},
		removeFromInitiativeList: (state, action) => {
			const playerInitiative = action.payload;
			const initiativeList = state.initiativeList;

			const findIndexHelper = (element) => element === playerInitiative;

			const indexToRemove = initiativeList.findIndex(findIndexHelper);

			initiativeList.splice(indexToRemove, 1);

			if (initiativeList.length === 0) {
				state.round = state.round + 1;
			}

			state.initiativeList = initiativeList;
		},
		addToInitiativeList: (state, action) => {
			state.initiativeList.push(action.payload);
		},
		setRoster: (state, action) => {
			// state.roster = JSON.parse(action.payload);
			state.roster = action.payload;
		},
		clearRoster: (state) => {
			state.round = 0;
			state.roster = [];
			state.initiativeList = [];
			state.highestInitiative = "";
			state.battleInProgress = false;
			state.finished = [];
			state.waiting = [];
		},

		addRound: (state) => {
			state.round = state.round + 1;
		},
		setFinished: (state, action) => {
			state.finished.push(action.payload);
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
	setFinished,
	addRound,
	setInitiativeList,
	addToInitiativeList,
	removeFromInitiativeList,
	toogleBattleInProgress,
	setHighestInitiative,
	addDisabledCombatants,
	removeDisabledCombatant,
} = combatSlice.actions;
// Select states
export const selectRoster = (state) => state.combatSlice.roster;
export const selectRound = (state) => state.combatSlice.round;
// export const selectActivePlayers = (state) => state.combatSlice.activePlayers;
export const selectWaiting = (state) => state.combatSlice.waiting;
export const selectFinished = (state) => state.combatSlice.finished;
export const selectDisabledCombatants = (state) =>
	state.combatSlice.disabledCombatants;
export const selectInitiativeList = (state) => state.combatSlice.initiativeList;
export const selectBattleInProgress = (state) =>
	state.combatSlice.battleInProgress;
export const selectHighestInitiative = (state) =>
	state.combatSlice.highestInitiative;
//--
export default combatSlice.reducer;
