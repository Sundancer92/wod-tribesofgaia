import { Personaje } from "../../../classes/personaje";

export const customStringify = (key, value) => {
	if (value instanceof Personaje) {
		const personaje = {
			name: value.name,
			team: value.team,
			initiative: value.initiative,
			finished: value.finished,
			waiting: value.waiting,
			disabled: value.disabled,
			turns: value.turns,
		};
		return personaje;
	}
	return value;
};

export const reviver = (value) => {
	if (
		value &&
		typeof value === "object" &&
		value.hasOwnProperty("name") &&
		value.hasOwnProperty("team") &&
		value.hasOwnProperty("initiative")
	) {
		return new Personaje(
			value.name,
			value.team,
			value.initiative,
			value.finished,
			value.waiting,
			value.disabled,
			value.turns,
		);
	} else {
		return value;
	}
};
