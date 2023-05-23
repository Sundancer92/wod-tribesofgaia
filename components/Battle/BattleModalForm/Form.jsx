//--- MUI
import {
	Grid,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
//--- Formik
import { useFormik } from "formik";
//--- React
import { useState } from "react";
//--- Class
import { Personaje } from "../../../classes/character";
//--- Helpers
import { sortByInitiative } from "../helpers/combatSetup/sortByInitiative";
import { playerOrderResolver } from "../helpers/combatSetup/playerOrderResolver";

//--- REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	setRoster,
	selectRoster,
	selectInitiativeList,
	prepareFirstRound,
	setInitiativeList,
} from "../../../store/slices/combatSlice";

export const PersonajeForm = ({ closeModal }) => {
	const dispatch = useDispatch();
	const roster = useSelector(selectRoster);
	const initiativeList = useSelector(selectInitiativeList);

	const tryBtn = () => {
		closeModal();
	};

	const startButton = () => {
		// Roster ordenado
		const rosterOrder = sortByInitiative(roster);
		const firstToPlay =
			playerOrderResolver(rosterOrder).highestInitiativePlayers;
		const initiatives = playerOrderResolver(rosterOrder).valoresIniciativa;

		dispatch(setInitiativeList(initiatives));
		dispatch(prepareFirstRound(firstToPlay));
		dispatch(setRoster(JSON.stringify(rosterOrder)));
		// LOCAL STORAGE
		localStorage.setItem("roster", JSON.stringify(rosterOrder));
		localStorage.setItem("initiatives", JSON.stringify(initiatives));
		closeModal();
	};

	const initialValues = {
		charName: "",
		charTeam: "",
		charInitiative: 0,
	};

	const { values, errors, handleChange, handleSubmit, handleReset } =
		useFormik({
			initialValues,
			onSubmit: () => {
				const charList = JSON.stringify([...roster, values]);
				const initiatives = [...initiativeList, values.charInitiative];
				dispatch(setRoster(charList));
				dispatch(setInitiativeList(initiatives));
			},
		});

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center">
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item sx={{ p: 1 }}>
						<FormControl
							variant="outlined"
							sx={{ color: "white" }}
							required>
							<InputLabel htmlFor="name-input" sx={{ color: "white" }}>
								Nombre
							</InputLabel>
							<OutlinedInput
								name="charName"
								value={values.name}
								onChange={handleChange}
								label="Nombre"
								type="text"
								sx={{ color: "white" }}
							/>
						</FormControl>
					</Grid>
					<Grid item sx={{ p: 1 }}>
						<FormControl
							variant="outlined"
							sx={{ color: "white" }}
							required>
							<InputLabel htmlFor="team-input" sx={{ color: "white" }}>
								Equipo
							</InputLabel>
							<OutlinedInput
								name="charTeam"
								value={values.team}
								onChange={handleChange}
								label="Equipo"
								type="text"
								sx={{ color: "white" }}
							/>
						</FormControl>
					</Grid>
					<Grid item sx={{ p: 1 }}>
						<FormControl
							variant="outlined"
							sx={{ color: "white" }}
							required>
							<InputLabel
								htmlFor="initiative-input"
								sx={{ color: "white" }}>
								Iniciativa
							</InputLabel>
							<OutlinedInput
								name="charInitiative"
								value={values.initiative}
								onChange={handleChange}
								label="Iniciativa"
								type="number"
								sx={{ color: "white" }}
							/>
						</FormControl>
					</Grid>
				</Grid>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<Button
						sx={{ m: 1 }}
						variant="contained"
						color="custom"
						text="white"
						type="submit">
						Agregar
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="contained"
						color="error"
						onClick={tryBtn}>
						{/* onClick={closeModal}> */}
						Cerrar
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="contained"
						color="success"
						fullWidth
						// onClick={closeModal}>
						onClick={startButton}>
						Comenzar
					</Button>
				</Grid>
			</form>
		</Grid>
	);
};
