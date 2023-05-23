import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromInitiativeList,
	selectHighestInitiative,
	selectInitiativeList,
} from "../../store/slices/combatSlice";
//CLASS
import { Character } from "../../classes/character";

export default function CombatantBattleCard({ p }) {
	const dispatch = useDispatch();
	const highestInitiative = useSelector(selectHighestInitiative);
	const [char, setChar] = useState(p);
	const [isActive, setActive] = useState(true);

	useEffect(() => {
		// console.log("isActive useEffect");
		// console.log(
		// 	`Char Initiative: ${char.initiative} and Highest Ini: ${highestInitiative}`,
		// );
		if (char.initiative == highestInitiative) {
			setActive(true);
		} else {
			setChar({ ...char, extraTurn: false });
			setActive(false);
		}
	}, [highestInitiative]);

	const addExtraTurnBTN = () => {
		console.log("BOTON RABIA FUNCIONA");
		setChar({ ...char, turns: char.turns + 1 });
		if (isActive === false && char.extraTurn === true) {
			setChar({ ...char, turns: char.turns + 1 });
		} else if (isActive === false) {
			setChar({ ...char, extraTurn: true });
		}
	};
	const endTurn = () => {
		console.log("BOTON TERMINAR TURNO FUNCIONA");
		if (char.turns > 1) {
			setChar({ ...char, turns: char.turns - 1 });
		} else if (char.turns === 1 && char.initiative === highestInitiative) {
			dispatch(removeFromInitiativeList(char.initiative));
			setActive(false);
		} else if (char.turns === 1 && char.extraTurn === true) {
			setChar({ ...char, extraTurn: false });
		}
	};

	const estadoBtn = () => {
		console.log(
			"USAR SPLICE E INDEXOF PARA REMOVER SOLO UN INITIATIVE DE INITIATIVE LIST",
		);
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
				// bgcolor: activePlayers.includes(index)
				// 	? "divider"
				// 	: playersWithBonusActions.includes(index)
				// 	? "primary.dark"
				// 	: "#fff",
				bgcolor:
					isActive && char.turns > 0
						? "divider"
						: char.turns > 0 && char.extraTurn
						? "primary.dark"
						: "fff",
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
									<Typography variant="h6">{char.name}</Typography>
								</Grid>
								<Grid item xd={8}>
									{/* <Typography align="right" variant="subtitle2">
										{char.team}
									</Typography> */}
								</Grid>
							</Grid>
						</Grid>
						{/* Contenedor Iniciativa y Turnos*/}
						{(isActive === true &&
							char.initiative == highestInitiative &&
							char.turns > 0) ||
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
							<Grid
								item
								// xs={3}
								sx={{ mt: 2 }}>
								<Button
									sx={{ p: 0.2 }}
									variant="outlined"
									onClick={() => addExtraTurnBTN()}>
									RABIA
								</Button>
							</Grid>
							<Grid
								item
								// xs={3}
								sx={{ mt: 2 }}>
								<Button
									sx={{ p: 0.2 }}
									variant="outlined"
									onClick={() => estadoBtn()}>
									Esperar
								</Button>
							</Grid>
							<Grid
								item
								// xs={3}
								sx={{ mt: 2 }}>
								<Button sx={{ p: 0.2 }} variant="outlined">
									{" "}
									Incapacitar{" "}
								</Button>
							</Grid>
							<Grid
								item
								// xs={3}
								sx={{ mt: 2 }}>
								<Button
									sx={{ p: 0.2 }}
									variant="outlined"
									onClick={() => endTurn()}>
									Terminar
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Paper>
	);
}
