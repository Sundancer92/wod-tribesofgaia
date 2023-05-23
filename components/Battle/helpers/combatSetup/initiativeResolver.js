export const initiativeResolver = (roster) => {
	const initiativeList = roster.map((player) => player.initiative);
	const highestInitiative = Math.max(...initiativeList);
	const sortedRoster = [...roster].sort((a, b) => b.initiative - a.initiative);

	return { highestInitiative, initiativeList, sortedRoster };
};
