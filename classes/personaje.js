export class Personaje {
	constructor(name, team, initiative) {
		this.name = name;
		this.team = team;
		this.initiative = initiative;
		this.finished = false;
		this.waiting = false;
		this.disabled = false;
		this.turns = 0;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = nombre;
	}

	getTeam() {
		return this.team;
	}

	setTeam(team) {
		this.team = team;
	}

	getInitiative() {
		return this.initiative;
	}

	setInitiative(initiative) {
		this.initiative = initiative;
	}

	getFinished() {
		return this.finished;
	}

	setFinished(finished) {
		this.finished = finished;
	}

	getWaiting() {
		return this.waiting;
	}

	setWaiting(waiting) {
		this.waiting = waiting;
	}

	getDisable() {
		return this.disabled;
	}

	setDisabled(disabled) {
		this.disabled = disabled;
	}

	getTurns() {
		return this.turns;
	}

	setTurns(turns) {
		this.turns = turns;
	}
}
