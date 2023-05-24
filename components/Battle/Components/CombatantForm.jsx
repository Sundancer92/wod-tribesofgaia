// REACT HOOKS
import { useEffect, useState } from "react";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectBattleInProgress } from "../../../store/slices/combatSlice";
// MUI
import {
	Modal,
	Box,
	Paper,
	Grid,
	Button,
	FormControl,
	FormLabel,
	OutlinedInput,
	Typography,
	Select,
	Switch,
	MenuItem,
	InputLabel,
} from "@mui/material";

// FORMIK
import { useFormik } from "formik";
import {
	setRoster,
	selectRoster,
	toogleBattleInProgress,
} from "../../../store/slices/combatSlice";
import { initiativeResolver } from "../helpers/combatSetup/initiativeResolver";

export default function CombatantForm({ isModalOpen, closeModal }) {
	const battleInProgress = useSelector(selectBattleInProgress);
	const roster = useSelector(selectRoster);

	const [checked, setChecked] = useState(false);

	const handleSwitchChange = (e) => {
		setChecked(e.target.checked);
	};

	const dispatch = useDispatch();

	const startButton = () => {
		const { sortedRoster } = initiativeResolver(roster);
		dispatch(setRoster(sortedRoster));
		dispatch(toogleBattleInProgress());
		closeModal();
	};

	const continueBtn = () => {
		closeModal();
	};

	const initialValues = {
		name: "",
		team: "",
		initiative: "",
		turns: 1,
		status: "active",
	};

	const { values, handleChange, handleSubmit, handleReset } = useFormik({
		initialValues,
		onSubmit: () => {
			if (battleInProgress === true) {
				values.initiative = 0;
				values.status = "waitingNextRound";
			}
			dispatch(setRoster([...roster, values]));
			handleReset();
		},
	});

	return (
		<Modal open={isModalOpen}>
			<Box
				sx={{
					mx: "auto",
					mt: "3rem",
					p: 1,
					borderRadius: 2,
					bgcolor: "secondary.main",
					width: { xs: 300 },
				}}>
				<Paper
					sx={{
						p: 2,
						borderRadius: 2,
						bgcolor: "#494847",
						// color: "white",
					}}>
					<Grid container direction="row" justifyContent="space-between">
						<Typography xs={8} variant="h5">
							{checked === true
								? "Luchador Existente"
								: "Nuevo Luchador"}
						</Typography>
						<Switch
							checked={checked}
							onChange={handleSwitchChange}
							color="warning"
						/>
					</Grid>
					<form onSubmit={handleSubmit}>
						<FormControl sx={{ mb: 2 }}>
							<InputLabel htmlFor="name">Nombre</InputLabel>
							{checked === true ? (
								<Select
									required
									sx={{ width: { xs: 252.5 }, color: "black" }}
									name="name"
									value={values.name}
									onChange={handleChange}
									label="Nomb">
									<MenuItem value={"Nuevo Amanecer"}>
										Nuevo Amanecer
									</MenuItem>
									<MenuItem value={"Eterno Acompañante"}>
										Eterno Acompañante
									</MenuItem>
									<MenuItem value={"Mai"}>Mai</MenuItem>
									<MenuItem value={"Velkan"}>Velkan</MenuItem>
									<MenuItem value={"Corriente Cálida"}>
										Corriente Cálida
									</MenuItem>
								</Select>
							) : (
								<OutlinedInput
									sx={{ width: { xs: 252.5 } }}
									required
									name="name"
									label="Nomb"
									value={values.name}
									onChange={handleChange}
									type="text"
								/>
							)}
						</FormControl>

						<FormControl
							sx={{
								mb: 2,
							}}>
							<InputLabel htmlFor="Equipo">Equipo</InputLabel>
							{/* <OutlinedInput
								sx={{ width: { xs: 252.5 } }}
								fullWidth
								name="team"
								onChange={handleChange}
								label="Equipo"
								type="text"
								value={values.team}
							/> */}
							<Select
								required
								sx={{ width: { xs: 252.5 }, color: "black" }}
								name="team"
								value={values.team}
								onChange={handleChange}
								label="Equipo">
								<MenuItem value={"El Orgullo de Raion Tatoru"}>
									El Orgullo de Raion Tatoru
								</MenuItem>
								<MenuItem value={"Wyrm #1"}>Wyrm #1</MenuItem>
								<MenuItem value={"Wyrm #2"}>Wyrm #2</MenuItem>
								<MenuItem value={"Team A"}>Team A</MenuItem>
								<MenuItem value={"Team B"}>Team B</MenuItem>
							</Select>
						</FormControl>
						{battleInProgress === false ? (
							<FormControl sx={{ mb: 2 }}>
								<InputLabel htmlFor="Iniciativa">Iniciativa</InputLabel>
								<OutlinedInput
									sx={{ width: { xs: 252.5 } }}
									required
									name="initiative"
									value={values.initiative}
									onChange={handleChange}
									label="Inicitive"
									type="number"
								/>
							</FormControl>
						) : (
							""
						)}

						<Grid container direction="row" justifyContent="space-around">
							<Button
								xs={6}
								sx={{ width: 120, bgcolor: "secondary.main" }}
								variant="contained"
								// color="secondary.main"
								type="submit">
								Guardar
							</Button>
							<Button
								xs={6}
								sx={{ width: 120 }}
								variant="contained"
								color="error"
								onClick={() => {
									handleReset(), closeModal();
								}}>
								Cerrar
							</Button>
						</Grid>
					</form>
					{battleInProgress === true ? (
						<Button
							sx={{ mt: 2 }}
							fullWidth
							variant="contained"
							color="success"
							onClick={() => {
								continueBtn(), handleReset();
							}}>
							CONTINUAR
						</Button>
					) : (
						<Button
							sx={{ mt: 2 }}
							fullWidth
							variant="contained"
							color="success"
							onClick={() => {
								startButton(), handleReset();
							}}>
							COMENZAR
						</Button>
					)}
				</Paper>
			</Box>
		</Modal>
	);
}
