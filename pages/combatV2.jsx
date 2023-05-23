// MUI
import { Grid, Typography } from "@mui/material";
// COMPONENTS
import CombatantForm from "../components/combatV2Components/CombatantForm.jsx";
import CombatantBattleCard from "../components/combatV2Components/CombatantBattleCard.jsx";
// CUSTOM HOOKS
import { useModal } from "../hooks/useModal";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	selectBattleInProgress,
	selectInitiativeList,
	selectRoster,
	selectRound,
	setHighestInitiative,
	setInitiativeList,
	setRoster,
} from "../store/slices/combatSlice.js";
// REACT
import { use, useEffect } from "react";
// HELPERS
import { initiativeResolver } from "../components/Battle/helpers/combatSetup/initiativeResolver.js";

export default function combatV2() {
	const dispatch = useDispatch();

	const combatRound = useSelector(selectRound);
	const battleInProgress = useSelector(selectBattleInProgress);
	const roster = useSelector(selectRoster);
	const initiativeList = useSelector(selectInitiativeList);

	useEffect(() => {
		roster.length === 0 ? openModal() : "";
	}, []);

	useEffect(() => {
		console.log("Battle IN PROGRESS HOOK");
		if (battleInProgress === true && initiativeList.length === 0) {
			const { highestInitiative, initiativeList } =
				initiativeResolver(roster);
			// PREPARGIN BATTLE ORGANIZATION
			dispatch(setHighestInitiative(highestInitiative));
			dispatch(setInitiativeList(initiativeList));
		}
	}, [battleInProgress, combatRound]);

	useEffect(() => {
		const newMaxInitiative = Math.max(...initiativeList);
		dispatch(setHighestInitiative(newMaxInitiative));
	}, [initiativeList]);

	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<Grid>
			<Typography sx={{ color: "white" }}>Round: {combatRound}</Typography>

			<CombatantForm isModalOpen={isModalOpen} closeModal={closeModal} />
			{battleInProgress &&
				roster.map((p, index) => <CombatantBattleCard key={index} p={p} />)}
		</Grid>
	);
}
