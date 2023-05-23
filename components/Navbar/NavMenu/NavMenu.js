import Link from "next/link";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemButton,
	Divider,
} from "@mui/material";
// import BlindIcon from '@mui/icons-material/Blind';
//---------
import Drawer from "@mui/material/Drawer";

//------
export default function NavMenu(props) {
	return (
		<Grid sx={{ bgcolor: "primary.main" }}>
			<Grid item>
				<Drawer
					anchor="left"
					open={props.open}
					onClose={() => props.setNavMenuOpen(false)}>
					<List>
						<ListItem>
							<ListItemText
								primary={
									<Typography variant="subtitle1">Enlaces</Typography>
								}
							/>
						</ListItem>
						<ListItem>
							<a
								href="http://www.wyrmfoe.com/werewolf-gifts/"
								target="_blanc">
								<ListItemButton>
									<ListItemText primary="Wyrmfoe - Gifts" />
									<ListItemIcon>{/* <BlindIcon /> */}</ListItemIcon>
								</ListItemButton>
							</a>
						</ListItem>
						<Divider />
					</List>
				</Drawer>
			</Grid>
		</Grid>
	);
}
