export const firstRoundActivePlayers = (roster) => {
	const valoresIniciativa = roster.map((player) => player.initiative);
	const iniciativaMasAlta = Math.max(...valoresIniciativa);
	const indicesConIniciativaMasAlta = roster
		.map((player, index) =>
			player.initiative == iniciativaMasAlta ? index : undefined,
		)
		.filter((index) => index !== undefined);

	const result = roster.map((player, index) => {
		if (indicesConIniciativaMasAlta.includes(index)) {
			return { ...player, turns: 1 };
		} else {
			return player;
		}
	});

	return result;
};
