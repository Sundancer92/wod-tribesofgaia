//---- REACT
import { useState, useEffect, useReducer } from "react";
//---- MUI
import {
	Box,
	Typography,
	Grid,
	List,
	Divider,
	ListItem,
	Button,
} from "@mui/material";
//---- ICONS
// Componentes
import BattleCard from "../components/Battle/BattleCard/BattleCard";
import BattleModalForm from "../components/Battle/BattleModalForm/BattleModalForm";
// Custom Hooks
import { useModal } from "../hooks/useModal";
//---- Helpers

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	setRoster,
	setInitiativeList,
	selectRoster,
	selectRound,
	selectPlayersWithBonusActions,
	selectActivePlayers,
	selectFinished,
} from "../store/slices/combatSlice";

//---- Component
export default function combat() {
	// REDUX
	const dispatch = useDispatch();

	const round = useSelector(selectRound);
	const roster = useSelector(selectRoster);
	const finished = useSelector(selectFinished);
	const activePlayers = useSelector(selectActivePlayers);
	const playersWithBonusActions = useSelector(selectPlayersWithBonusActions);
	//------
	const { isModalOpen, openModal, closeModal } = useModal();
	//---Control de Turno
	useEffect(() => {
		if (
			finished.lenght === roster.length &&
			activePlayers.lenght === 0 &&
			playersWithBonusActions.length === 0
		) {
			console.log("Estamos para un nuevo round");
		}
	}, [finished]);
	// Carga la ultima sesion o abre el formulario
	useEffect(() => {
		const combatData = {
			roster: localStorage.getItem("roster"),
			initiatives: JSON.parse(localStorage.getItem("initiatives")),
		};
		if (combatData.roster) {
			dispatch(setRoster(combatData.roster));
			dispatch(setInitiativeList(combatData.initiatives));
		} else {
			openModal();
		}
	}, []);

	return (
		<>
			<Box
				sx={{
					mb: "6rem",
					bgcolor: "custom.dark",
					color: "white",
				}}>
				<Grid>
					<List>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							alignItems="center">
							<Grid item>
								<ListItem>
									<Typography variant="h4">
										Turno:
										{/* {playing.join(", ")} */}
									</Typography>
								</ListItem>
							</Grid>
							<Grid item sx={{ mr: 2 }}>
								<Button
									color="secondary"
									sx={{ border: 1, p: 1, my: 1 }}
									onClick={openModal}>
									Agregar
								</Button>
							</Grid>
						</Grid>
						<Divider />
						<ListItem>
							<Typography variant="h6">RONDA: {round}</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid>
					<List>
						{roster.map((player, index) => (
							<ListItem key={index}>
								{/* <Paper
									sx={{
										border: 1,
										borderColor: "divider",
										mx: "auto",
										// ...(player.turns >= 1 && {
										// 	bgcolor: "divider",
										// }),
									}}> */}
								<BattleCard player={player} index={index} />
								{/* </Paper> */}
							</ListItem>
						))}
					</List>
				</Grid>
			</Box>
			<BattleModalForm isModalOpen={isModalOpen} closeModal={closeModal} />
		</>
	);
}
