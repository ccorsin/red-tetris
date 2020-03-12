class Player {
	constructor (name, id) {
		this.name = name;
		this.id = id;
		this.spectre = [];
		this.round = 0;
		this.freeze = 0;
		this.loser = false;
		this.color = (Math.floor(Math.random() * 255) + 1) +','+ (Math.floor(Math.random() * 255) + 1) +','+ (Math.floor(Math.random() * 255) + 1);
		this.rows = 0;
		this.score = 0;
		this.level = 0;
	}

	set_score(round, rows, level) {
		this.round = round;
		this.rows = rows;
		this.level = level;
	}

	add_round() {
		this.round += 1;
	}

	add_freeze() {
		this.freeze += 1;
	}

	set_spectre(spectre) {
		this.spectre = spectre;
	}

	add_line() {
		this.spectre.map(e => {
			if (e < 19)
				return e + 1;
			else
				return 20;
		});
	}

	remove_line() {
		this.spectre.map(e => {
			if (e > 0)
				return e - 1;
			else
				return e;
		});
	}

	lose() {
		this.loser = true;
	}

	win() {
		this.winner = true
	}

	reset_player() {
		const player = new Player(this.name, this.id);
		return player;
	}
}

module.exports = Player;
