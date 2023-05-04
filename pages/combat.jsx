//---- REACT
import { useState, useEffect, useReducer } from "react";
//---- MUI
import {
	Box,
	Paper,
	Typography,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Divider,
	ListItem,
	Fab,
	Button,
} from "@mui/material";
//---- ICONS
import AddIcon from "@mui/icons-material/Add";
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
	selectRoster,
	selectRound,
} from "../store/slices/combatSlice";

//---- Component
export default function combat() {
	const dispatch = useDispatch();
	const roster = useSelector(selectRoster);
	const round = useSelector(selectRound);
	//------
	const { isModalOpen, openModal, closeModal } = useModal();
	//---Control de Turno
	// Carga la ultima sesion o abre el formulario
	useEffect(() => {
		const combatData = JSON.parse(localStorage.getItem("roster"));
		if (combatData) {
			const roster = JSON.stringify(combatData);
			dispatch(setRoster(roster));
		} else {
			openModal();
		}
	}, []);

	// Prepara por orden de iniciativa a los jugadores
	// useEffect(() => {
	// 	const activePlayers = firstRoundActivePlayers(roster);
	// 	setActivePlayers(activePlayers);
	// }, [roster]);

	// // Escribe los nombres de los jugadores activos
	// useEffect(() => {
	// 	const playing = roster
	// 		.map((player, index) => {
	// 			if (activePlayers.includes(index)) {
	// 				return player.name;
	// 			}
	// 		})
	// 		.filter((name) => name !== undefined);
	// 	setPlaying(playing);
	// }, [activePlayers]);

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
