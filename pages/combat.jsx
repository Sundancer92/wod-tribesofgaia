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
import { firstRoundActivePlayers } from "../components/Battle/helpers/firstRoundActivePlayers";
// Reducer
import { turnsReducer } from "../components/Battle/helpers/turnsReducer";

//---- Component
export default function combat() {
	const { isModalOpen, openModal, closeModal } = useModal();
	//---Control de Turno
	// Jugador activo
	const [playing, setPlaying] = useState([]);
	// Son los personajes en combate
	const [roster, setRoster] = useState([]);
	// Son los jugadores con su turno activo
	const [activePlayers, setActivePlayers] = useState([]);
	// Total de Rondas
	const [round, setRound] = useState(1);
	// turnsReducer
	const [turns, dispatch] = useReducer(turnsReducer, roster);

	// Carga la ultima sesion o abre el formulario
	useEffect(() => {
		const combatData = localStorage.getItem("roster");
		if (combatData) {
			setRoster(JSON.parse(combatData));
		} else {
			openModal();
		}
	}, []);

	// Prepara por orden de iniciativa a los jugadores
	useEffect(() => {
		const activePlayers = firstRoundActivePlayers(roster);
		setActivePlayers(activePlayers);
	}, [roster]);

	// Escribe los nombres de los jugadores activos
	useEffect(() => {
		const playing = roster
			.map((player, index) => {
				if (activePlayers.includes(index)) {
					return player.name;
				}
			})
			.filter((name) => name !== undefined);
		setPlaying(playing);
	}, [activePlayers]);

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
										Turno: {playing.join(", ")}
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
								<Paper
									sx={{
										border: 1,
										borderColor: "divider",
										mx: "auto",
										...(player.turns >= 1 && {
											bgcolor: "divider",
										}),
									}}>
									<BattleCard
										player={player}
									/>
								</Paper>
							</ListItem>
						))}
					</List>
				</Grid>
			</Box>
			<BattleModalForm
				isModalOpen={isModalOpen}
				closeModal={closeModal}
				roster={roster}
				setRoster={setRoster}
			/>
		</>
	);
}
