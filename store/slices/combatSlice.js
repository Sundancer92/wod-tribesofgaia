import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	battleInProgress: false,
	roster: [],
	round: 0,
	highestInitiative: "",
	initiativeList: [],
	activePlayers: [],
	playersWithBonusActions: [],
	waiting: [],
	finished: [],
};

export const combatSlice = createSlice({
	name: "combatSlice",
	initialState,
	reducers: {
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
			state.activePlayers = [];
			state.playersWithBonusActions = [];
			state.waiting = [];
		},

		addRound: (state) => {
			state.round = state.round + 1;
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
			// if (current(state.activePlayers).includes(playerIndex)) {
			const filtered = state.activePlayers.filter((e) => e !== playerIndex);
			state.activePlayers = filtered;
			// }
		},

		addPlayersWithBonusActions: (state, action) => {
			state.playersWithBonusActions.push(action.payload);
		},

		removePlayersWithBonusActions: (state, action) => {
			const playerIndex = action.payload;
			if (current(state.playersWithBonusActions).includes(playerIndex)) {
				const filtered = state.playersWithBonusActions.filter(
					(e) => e !== playerIndex,
				);
				state.playersWithBonusActions = filtered;
			}
		},

		setFinished: (state, action) => {
			state.finished.push(action.payload);
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
	addPlayersWithBonusActions,
	removePlayersWithBonusActions,
	setFinished,
	setNextRound,
	addRound,
	setInitiativeList,
	removeFromInitiativeList,
	toogleBattleInProgress,
	setHighestInitiative,
} = combatSlice.actions;
// Select states
export const selectRoster = (state) => state.combatSlice.roster;
export const selectRound = (state) => state.combatSlice.round;
export const selectActivePlayers = (state) => state.combatSlice.activePlayers;
export const selectWaiting = (state) => state.combatSlice.waiting;
export const selectFinished = (state) => state.combatSlice.finished;
export const selectPlayersWithBonusActions = (state) =>
	state.combatSlice.playersWithBonusActions;
export const selectInitiativeList = (state) => state.combatSlice.initiativeList;
export const selectBattleInProgress = (state) =>
	state.combatSlice.battleInProgress;
export const selectHighestInitiative = (state) =>
	state.combatSlice.highestInitiative;
//--
export default combatSlice.reducer;
