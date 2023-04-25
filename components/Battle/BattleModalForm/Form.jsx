import {
	Grid,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { useState } from "react";
//--- Class
import { Personaje } from "../../../classes/personaje";
//--- Helpers
import { sortByInitiative } from "../helpers/sortByInitiative";

export const PersonajeForm = ({
	setRoster,
	closeModal,
	roster,
}) => {
	const [name, setName] = useState("");
	const [team, setTeam] = useState("");
	const [initiative, setInitiative] = useState("");
	// const [finished, setfinished] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const newPersonaje = new Personaje(name, team, initiative);
		// onSubmit(newPersonaje);
		setName("");
		setTeam("");
		setInitiative("");

		const order = sortByInitiative([...roster, newPersonaje]);
		// setRoster([...roster, newPersonaje]);
		setRoster(order);

		localStorage.setItem("roster", JSON.stringify(order));
	};

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
								id="name-input"
								value={name}
								onChange={(event) => setName(event.target.value)}
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
								id="team-input"
								value={team}
								onChange={(event) => setTeam(event.target.value)}
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
								id="initiative-input"
								value={initiative}
								onChange={(event) => setInitiative(event.target.value)}
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
						onClick={closeModal}>
						Cancelar
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="contained"
						color="success"
						fullWidth
						onClick={closeModal}>
						Comenzar
					</Button>
				</Grid>
			</form>
		</Grid>
	);
};
