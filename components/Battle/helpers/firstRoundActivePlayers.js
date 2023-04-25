export const firstRoundActivePlayers = (roster) => {
	// Recorre ROSTER y guarda los indices de los jugadores
	const valoresIniciativa = roster.map((player) => player.initiative);
	// Guarda el valor de la iniciativa mas alta
	const iniciativaMasAlta = Math.max(...valoresIniciativa);
	
	const indicesConIniciativaMasAlta = roster
		.map((player, index) =>
			player.initiative == iniciativaMasAlta ? index : undefined,
		)
		.filter((index) => index !== undefined);

	roster.map((player, index) => {
		if (indicesConIniciativaMasAlta.includes(index)) {
			player.turns = 1;
		} else {
			player.turns = 0;
		}
	});

	return indicesConIniciativaMasAlta;
};
