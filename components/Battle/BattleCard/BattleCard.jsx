import { Box, Paper, Grid, Typography, Button } from "@mui/material";
//-- Hooks
import { useState, useEffect, useReducer } from "react";
//-- Helpers

export default function BattleCard({ player }) {
	return (
		<>
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
						{/* Contenedor Iniciativa */}
						<Grid item sx={{}}>
							<Grid container sx={{ textAlign: "center" }}>
								<Paper sx={{ p: 1, border: 1, borderColor: "divider" }}>
									<Grid item xs={12}>
										<Typography>Iniciativa</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography> {player.initiative} </Typography>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
						{/* Contenedor Botones */}
						<Grid
							container
							direction="row"
							justifyContent="space-evenly"
							alignItems="center"
							align="center">
							<Grid item xs={6}>
								<Button>RABIA</Button>
							</Grid>
							<Grid item xs={6}>
								<Button>Esperar</Button>
							</Grid>
							<Grid item xs={6}>
								<Button> Incapacitar </Button>
							</Grid>
							<Grid item xs={6}>
								<Button>Terminar</Button>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
}
