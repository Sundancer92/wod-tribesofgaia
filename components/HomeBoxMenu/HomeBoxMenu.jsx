import Link from "next/link";
// REDUX
import { useDispatch } from "react-redux";
import { clearRoster } from "../../store/slices/combatSlice";

import {
	Box,
	Paper,
	Typography,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Divider,
} from "@mui/material";

export default function HomeBoxMenu() {
	const dispatch = useDispatch();

	const handleNewCombat = () => {
		// localStorage.removeItem("roster");
		// localStorage.removeItem("initiatives");
		dispatch(clearRoster());
	};

	return (
		<Box
			sx={{
				bgcolor: "primary.dark",
				boxShadow: 1,
				borderRadius: 2,
				p: 1,
				mx: "auto",
				mt: 2,
				minWidth: 300,
				width: { xs: 100, md: 200, lg: 300 },
			}}>
			<Paper
				elevation={4}
				sx={{
					p: 2,
				}}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center">
					<List>
						<Typography variant="h2" align="center">
							Menú
						</Typography>
						<Divider />
						<ListItemButton sx={{ mx: 2 }}>
							<Link href="/battleField" onClick={handleNewCombat}>
								NUEVO COMBATE
							</Link>
						</ListItemButton>
						<ListItemButton>
							<Link href="/battleField">REANUDAR COMBATE</Link>
						</ListItemButton>
					</List>
				</Grid>
			</Paper>
		</Box>
	);
}
