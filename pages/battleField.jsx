// MUI
import { Grid, Typography, Button } from "@mui/material";
// COMPONENTS
import CombatantForm from "../components/Battle/Components/CombatantForm.jsx";
import CombatantBattleCard from "../components/Battle/Components/CombatantBattleCard.jsx";
// CUSTOM HOOKS
import { useModal } from "../hooks/useModal.js";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	selectBattleInProgress,
	selectInitiativeList,
	selectRoster,
	selectRound,
	selectHighestInitiative,
	setHighestInitiative,
	setInitiativeList,
	setRoster,
} from "../store/slices/combatSlice.js";
// REACT
import { useEffect } from "react";
// HELPERS
import { initiativeResolver } from "../components/Battle/helpers/combatSetup/initiativeResolver.js";

export default function combatV2() {
	const dispatch = useDispatch();

	const combatRound = useSelector(selectRound);
	const battleInProgress = useSelector(selectBattleInProgress);
	const roster = useSelector(selectRoster);
	const initiativeList = useSelector(selectInitiativeList);
	const highestIni = useSelector(selectHighestInitiative);

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
			<Grid container direction="row" justifyContent="flex-end">
				{/* <Typography
					xs={2}
					sx={{ color: "white", mt: 1.5, ml: 2 }}
					variant="h6">
					Round: {combatRound}
				</Typography> */}
				<Button
					sx={{ mt: 1, mr: 2 }}
					color="info"
					variant="contained"
					onClick={() => openModal()}>
					Agregar Luchador
				</Button>
			</Grid>
			<CombatantForm isModalOpen={isModalOpen} closeModal={closeModal} />
			{battleInProgress &&
				roster.map((p, index) => (
					<CombatantBattleCard key={index} p={p} index={index} />
				))}
		</Grid>
	);
}
