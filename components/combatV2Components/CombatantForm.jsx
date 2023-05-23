// REACT HOOKS
import { useEffect, useState } from "react";
// REDUX
import { useSelector, useDispatch } from "react-redux";
// MUI
import {
	Modal,
	Box,
	Paper,
	Grid,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";
// FORMIK
import { useFormik } from "formik";
import {
	prepareFirstRound,
	setRoster,
	selectRoster,
	toogleBattleInProgress,
} from "../../store/slices/combatSlice";
import { initiativeResolver } from "../Battle/helpers/combatSetup/initiativeResolver";

export default function CombatantForm({ isModalOpen, closeModal }) {
	const dispatch = useDispatch();
	const roster = useSelector(selectRoster);

	const startButton = () => {
		const { sortedRoster } = initiativeResolver(roster);
		dispatch(setRoster(sortedRoster));
		dispatch(toogleBattleInProgress());
		closeModal();
	};

	// useEffect(() => {
	// 	console.log("Values FORM", roster);
	// }, [roster]);

	const initialValues = {
		name: "",
		team: "",
		initiative: "",
		turns: 1,
	};

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: () => {
			dispatch(setRoster([...roster, values]));
		},
	});

	return (
		<Modal open={isModalOpen} onClose={closeModal}>
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
						bgcolor: "custom.dark",
						color: "white",
					}}>
					<Typography variant="h5"> Personaje</Typography>
					<form onSubmit={handleSubmit}>
						<FormControl>
							<OutlinedInput
								required
								name="name"
								value={values.name}
								onChange={handleChange}
								label="Nombre"
								type="text"
							/>
						</FormControl>
						<FormControl>
							<OutlinedInput
								required
								name="initiative"
								value={values.initiative}
								onChange={handleChange}
								label="Iniciativa"
								type="number"
							/>
						</FormControl>
						<Button variant="contained" color="success" type="submit">
							Guardar
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={closeModal}>
							Cerrar
						</Button>
					</form>
					<Button variant="contained" color="error" onClick={startButton}>
						COMENZAR
					</Button>
				</Paper>
			</Box>
		</Modal>
	);
}
