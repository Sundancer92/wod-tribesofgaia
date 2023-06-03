export const teamNameFormater = (teamName) => {
	const words = teamName.split("_");

	const formatedName = words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return formatedName;
};
