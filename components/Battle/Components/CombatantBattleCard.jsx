import styles from "./CombatantBattleCard.module.css";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromInitiativeList,
	selectHighestInitiative,
	selectInitiativeList,
	addDisabledCombatants,
	removeDisabledCombatant,
	addToInitiativeList,
	selectRound,
	selectDisabledCombatants,
} from "../../../store/slices/combatSlice";

import CombatantBattleCardBGImage from "../../ImageHandlers/CombatantBattleCardBGImage";

// HELPER
import { teamNameFormater } from "../helpers/combatSetup/teamNameFormater";

export default function CombatantBattleCard({ p, i }) {
	const dispatch = useDispatch();
	const round = useSelector(selectRound);
	const highestInitiative = useSelector(selectHighestInitiative);
	const initiativeList = useSelector(selectInitiativeList);
	const disabledCombatants = useSelector(selectDisabledCombatants);
	const [char, setChar] = useState(p);
	const [status, setStatus] = useState(char.status);
	const [isActive, setActive] = useState(true);

	useEffect(() => {
		if (status === "disabled") {
			dispatch(removeFromInitiativeList(char.initiative));
		}
	}, [status, round]);

	useEffect(() => {
		if (status === "waitingNextRound" && initiativeList.length === 0) {
			setStatus("active");
		}
	}, [initiativeList]);

	useEffect(() => {
		if (char.initiative == highestInitiative) {
			setActive(true);
		} else {
			setChar({ ...char, extraTurn: false });
			setActive(false);
		}
	}, [highestInitiative]);

	// Si el estado es 'disabled', pasa a 'active' y se agrega la iniciativa del jugador a initiativeList y se remueve de la lista de disabledCombatants.
	const incapacitateBtn = () => {
		if (status === "disabled") {
			setStatus("active");
			if (char.initiative <= highestInitiative) {
				dispatch(addToInitiativeList(char.initiative));
			}
			dispatch(removeDisabledCombatant(i));
		} else {
			setStatus("disabled");
			dispatch(addDisabledCombatants(i));
		}
	};

	const addExtraTurnBTN = () => {
		console.log("BOTON RABIA FUNCIONA");
		if (status !== "disabled") {
			setChar({ ...char, turns: char.turns + 1 });
			if (isActive === false && char.extraTurn === true) {
				setChar({ ...char, turns: char.turns + 1 });
			} else if (isActive === false) {
				setChar({ ...char, extraTurn: true });
			}
		}
	};

	const endTurn = () => {
		console.log("BOTON TERMINAR TURNO FUNCIONA");
		if (status !== "disabled") {
			if (char.turns > 1) {
				setChar({ ...char, turns: char.turns - 1 });
			} else if (char.turns === 1 && char.initiative === highestInitiative) {
				dispatch(removeFromInitiativeList(char.initiative));
				setActive(false);
			} else if (char.turns === 1 && char.extraTurn === true) {
				setChar({ ...char, extraTurn: false });
			}
		}
	};

	const estadoBtn = () => {
		console.log(
			"USAR SPLICE E INDEXOF PARA REMOVER SOLO UN INITIATIVE DE INITIATIVE LIST",
		);
		console.log("Char Status State", status);
		console.log("Char: ", char);
		console.log("isActive? ", isActive);
		console.log("highestInitiative", highestInitiative);
	};

	return (
		<Paper
			sx={{
				border: 1,
				mx: "auto",
				maxWidth: 515,
				mt: 0.5,
				bgcolor:
					isActive === true && char.turns > 0 && status === "active"
						? "primary.light"
						: char.turns > 0 && char.extraTurn
						? "success.light"
						: "fff",
			}}>
			<Box sx={{ m: 1 }}>
				<Paper
					sx={{
						p: 2,
						margin: "auto",
						maxWidth: 500,
						bgcolor: status === "disabled" && "info.dark",
					}}
					elevation={1}>
					<Grid
						container
						spacing={2}
						justifyContent="space-between"
						className={styles.battleCardContainer}>
						<CombatantBattleCardBGImage customImagePath={char.team} />
						{/* Contenedor Nombre y Equipo */}
						<Grid item xs={8}>
							<Grid container sx={{ pt: 0, pl: 1 }}>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										className="styles.battleCardContainer">
										{char.name}
									</Typography>
								</Grid>
								<Grid item xd={12}>
									<Typography align="left" variant="subtitle2">
										{teamNameFormater(char.team)}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{/* Contenedor Iniciativa y Turnos*/}
						{(isActive === true &&
							char.initiative == highestInitiative &&
							char.turns > 0 &&
							status === "active") ||
						char.extraTurn === true ? (
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
											<Typography>{char.initiative}</Typography>
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						)}
						{/* Contenedor Botones */}
						<Grid
							container
							direction="row"
							justifyContent="space-around"
							align="center">
							{/* BOTON RABIA */}
							{status !== "disabled" && (
								<Grid
									item
									// xs={3}
									sx={{ mt: 2, ml: 2 }}>
									<Button
										disabled={status === "disabled"}
										sx={{ p: 0.2 }}
										variant="contained"
										color="error"
										onClick={() => addExtraTurnBTN()}>
										RABIA
									</Button>
								</Grid>
							)}
							{/* BOTON ESPERAR */}
							{status !== "disabled" && (
								<Grid
									item
									// xs={3}
									sx={{ mt: 2 }}>
									<Button
										disabled={status === "disabled"}
										sx={{ p: 0.2 }}
										variant="contained"
										color="warning"
										onClick={() => estadoBtn()}>
										Esperar
									</Button>
								</Grid>
							)}
							{/* BOTON INCPACITAR/RECAPACITAR */}
							<Grid item sx={{ mt: 2 }}>
								<Button
									sx={{ p: 0.2, px: status === "disabled" ? 10 : "" }}
									variant="contained"
									color={
										status === "disabled" ? "warning" : "secondary"
									}
									onClick={() => incapacitateBtn()}>
									{status === "disabled" ? "Reanimar" : "Incapacitar"}
								</Button>
							</Grid>
							{/* BOTON TERMINAR */}
							{status !== "disabled" && (
								<Grid
									item
									// xs={3}
									sx={{ mt: 2 }}>
									<Button
										// disabled={status === "disabled"}
										sx={{ p: 0.2 }}
										variant="contained"
										color="info"
										onClick={() => endTurn()}>
										Terminar
									</Button>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Paper>
	);
}
