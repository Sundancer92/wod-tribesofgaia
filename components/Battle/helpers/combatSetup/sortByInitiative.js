export const sortByInitiative = (activeCombat) => {
	const sorted = [...activeCombat].sort(
		(a, b) => b.charInitiative - a.charInitiative,
	);
	return sorted;
};
