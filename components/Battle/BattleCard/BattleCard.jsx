// REACT
import { useEffect, useState } from "react";
// MUI
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	selectActivePlayers,
	selectRoster,
	selectWaiting,
	selectFinished,
	addActivePlayers,
	removeActivePlayer,
	addPlayersWithBonusActions,
	removePlayersWithBonusActions,
	setFinished,
	setNextRound,
	selectPlayersWithBonusActions,
	selectInitiativeList,
	removeFromInitiativeList,
} from "../../../store/slices/combatSlice";
// Helper
import { reviver } from "../helpers/instanceReplacerAndReviver";
// Class
import { Character } from "../../../classes/character";

export default function BattleCard({ player, index }) {
	const dispatch = useDispatch();
	const activePlayers = useSelector(selectActivePlayers);
	const playersWithBonusActions = useSelector(selectPlayersWithBonusActions);
	const initiativeList = useSelector(selectInitiativeList);
	const finished = useSelector(selectFinished);

	const [char, setChar] = useState("");

	useEffect(() => {
		const newChar = new Character(
			player.charName,
			player.charTeam,
			player.charInitiative,
		);

		setChar(newChar);
	}, []);

	// useEffect(() => {
	// 	console.log(initiativeList);
	// }, [finished]);

	useEffect(() => {
		const highestIn = Math.max(...initiativeList);
		console.log("useEffect-[initiativeList]: ", char, highestIn);
		console.log("useEffect-[initiativeList]: ", player);
		if (highestIn !== NaN && highestIn === char?.initiative) {
			console.log("Iniciativa Mas Alta", highestIn);
			console.log("True", char);
			setChar({ ...char, turns: 1 });
			console.log(char);
		} else if (highestIn !== NaN && highestIn !== char?.initiative) {
			console.log("False", char);
			setChar({ ...char, turns: 0 });
		}
	}, [initiativeList]);

	const extraActionBtn = () => {
		if (char.turns > 0 && activePlayers.includes(index)) {
			setChar({ ...char, turns: char.turns + 1 });
		} else if (char.turns === 0) {
			setChar({ ...char, turns: char.turns + 1 });
			dispatch(addPlayersWithBonusActions(index));
		} else {
			setChar({ ...char, turns: char.turns + 1 });
		}
	};

	const endTurnBtn = () => {
		if (char.turns > 1) {
			setChar({ ...char, turns: char.turns - 1 });
		} else if (char.turns === 1 && activePlayers.includes(index)) {
			setChar({ ...char, turns: char.turns - 1 });
			// Por el momento solo hay dos estados para manejar jugadores activos.
			dispatch(setFinished(index));
			dispatch(removeActivePlayer(index));
		} else if (char.turns === 1 && playersWithBonusActions.includes(index)) {
			setChar({ ...char, turns: char.turns - 1 });
			dispatch(removePlayersWithBonusActions(index));
		}
	};

	// useEffect(() => {
	// 	if (
	// 		activePlayers.includes(index) &&
	// 		playersWithBonusActions.includes(index) &&
	// 		char
	// 	) {
	// 		char.addTurn();
	// 		setTurns(char.turns);
	// 	} else if (activePlayers.includes(index) && char) {
	// 		char.turns = 1;
	// 		setTurns(1);
	// 	}
	// }, [activePlayers]);

	// useEffect(() => {
	// 	if (player.initiative == highestIni && char != "null") {
	// 		dispatch(addActivePlayers(index));
	// 		char?.addTurn();
	// 		setTurns(1);
	// 	}
	// 	// setTurns(char?.turns);
	// }, [char]);

	// const rageBtn = () => {
	// 	if (char.turns === 0) {
	// 		char.addTurn();
	// 		dispatch(addplayersWithBonusActions(index));
	// 	} else {
	// 		char.addTurn();
	// 	}
	// 	setTurns(char.turns);
	// };

	// const waitBtn = () => {
	// 	// dispatch(setNextRound());
	// 	// console.log(player);
	// 	console.log("Char: ", char.name);
	// 	console.log("Turnos: ", char.turns);
	// };
	// const incapacitateBtn = () => {};

	// const endTurnBtn = () => {
	// 	if (char.turns === 1) {
	// 		dispatch(removeActivePlayer(index));
	// 		dispatch(setFinished({ index }));
	// 		dispatch(removeRagePlayer(index));
	// 		dispatch(setNextRound());
	// 		char.minusTurn();
	// 	} else if (char.turns === 0) {
	// 		return;
	// 	} else {
	// 		char.minusTurn();
	// 	}
	// 	setTurns(char.turns);
	// };

	return (
		<Paper
			sx={{
				border: 1,
				mx: "auto",
				bgcolor: activePlayers.includes(index)
					? "divider"
					: playersWithBonusActions.includes(index)
					? "primary.dark"
					: "#fff",
			}}>
			<Box sx={{ m: 1 }}>
				<Paper
					sx={{
						p: 2,
						margin: "auto",
						maxWidth: 500,
					}}
					elevation={1}>
					<Grid container spacing={2} justifyContent="space-between">
						{/* Contenedor Nombre y Equipo */}
						<Grid item xs={6}>
							<Grid container sx={{ pt: 0, pl: 1 }}>
								<Grid item xs={12}>
									<Typography variant="h6">
										{player.charName}
									</Typography>
								</Grid>
								<Grid item xd={8}>
									<Typography align="right" variant="subtitle2">
										{player.team}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{/* Contenedor Iniciativa y Turnos*/}
						{char.turns > 0 ? (
							<Grid item>
								<Grid container sx={{ textAlign: "center" }}>
									<Paper
										sx={{ p: 1, border: 1, borderColor: "divider" }}>
										<Grid item xs={12}>
											<Typography>Acciones</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography>{char.turns}</Typography>
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						) : (
							<Grid item>
								<Grid container sx={{ textAlign: "center" }}>
									<Paper
										sx={{ p: 1, border: 1, borderColor: "divider" }}>
										<Grid item xs={12}>
											<Typography>Iniciativa</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography>
												{player.charInitiative}
											</Typography>
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						)}
						{/* Contenedor Botones */}
						<Grid
							container
							direction="row"
							justifyContent="space-evenly"
							alignItems="center"
							align="center">
							<Grid item xs={6}>
								<Button
									onClick={extraActionBtn}
									// onClick={rageBtn}
								>
									RABIA
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
								// onClick={waitBtn}
								>
									Esperar
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button> Incapacitar </Button>
							</Grid>
							<Grid item xs={6}>
								<Button onClick={endTurnBtn}>Terminar</Button>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Paper>
	);
}
