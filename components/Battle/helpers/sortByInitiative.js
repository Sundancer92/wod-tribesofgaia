export const sortByInitiative = (activeCombat) => {
	const sorted = [...activeCombat].sort((a, b) => b.initiative - a.initiative);
	return sorted;
};
