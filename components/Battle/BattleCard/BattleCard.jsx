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
	setFinished,
	setNextRound,
} from "../../../store/slices/combatSlice";
// Helper
import { reviver } from "../helpers/instanceReplacerAndReviver";

export default function BattleCard({ player, index }) {
	const dispatch = useDispatch();
	const activePlayers = useSelector(selectActivePlayers);
	const [char, setChar] = useState(null);
	const [turns, setTurns] = useState(char?.turns);

	useEffect(() => {
		setChar(reviver(player));
	}, [player]);

	useEffect(() => {
		if (index === 0 && char != "null") {
			char?.addTurn();
			setTurns(1);
		}
		// setTurns(char?.turns);
	}, [char]);

	const rageBtn = () => {
		if (char.turns === 0) {
			char.addTurn();
			dispatch(addActivePlayers(index));
		} else {
			char.addTurn();
		}
		setTurns(char.turns);
	};

	const waitBtn = () => {
		// dispatch(setNextRound());
		// console.log(player);
		console.log("Char: ", char.name);
		console.log("Turnos: ", char.turns);
	};
	const incapacitateBtn = () => {};

	const endTurnBtn = () => {
		if (char.turns === 1) {
			dispatch(removeActivePlayer(index));
			dispatch(setFinished(index));
			char.minusTurn();
		} else if (char.turns === 0) {
			return;
		} else {
			char.minusTurn();
		}
		setTurns(char.turns);
	};

	return (
		<Paper
			sx={{
				border: 1,
				mx: "auto",
				bgcolor: activePlayers.includes(index) ? "divider" : "#fff",
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
									<Typography variant="h6">{player.name}</Typography>
								</Grid>
								<Grid item xd={8}>
									<Typography align="right" variant="subtitle2">
										{player.team}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{/* Contenedor Iniciativa y Turnos*/}
						{turns > 0 ? (
							<Grid item>
								<Grid container sx={{ textAlign: "center" }}>
									<Paper
										sx={{ p: 1, border: 1, borderColor: "divider" }}>
										<Grid item xs={12}>
											<Typography>Acciones</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography>{turns}</Typography>
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
											<Typography>{player.initiative}</Typography>
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
								<Button onClick={rageBtn}>RABIA</Button>
							</Grid>
							<Grid item xs={6}>
								<Button onClick={waitBtn}>Esperar</Button>
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
