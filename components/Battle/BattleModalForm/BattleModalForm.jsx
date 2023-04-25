import { Modal, Box, Paper, Typography, Grid } from "@mui/material";
import { PersonajeForm } from "./Form";

export default function BattleModalForm({ isModalOpen, closeModal, setRoster,roster, updateTurns }) {
	return (
		<>
			<Modal
				open={isModalOpen}
				onClose={closeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={{
                        p:1,
						mx: "auto",
						mt: "3rem",
                        boxShadow: 1,
                        borderRadius: 2,
                        bgcolor: 'secondary.main',
                        width: { xs: 300, md: 300, lg: 350 },
					}}>
					<Paper elevation={4} sx={{p:2, borderRadius: 2,bgcolor: 'custom.dark', color: 'white'}}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="center">
							<Typography variant="h6">Agregar Personaje</Typography>
							<PersonajeForm setRoster={setRoster} closeModal={closeModal} roster={roster}/>
						</Grid>
					</Paper>
				</Box>
			</Modal>
		</>
	);
}
