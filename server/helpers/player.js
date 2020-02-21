class Player {
    constructor (name, id) {
        this.name = name;
        this.id = id;
        this.line = 0;
        this.round = 0;
        this.freeze = 0;
        this.loser = false;
        this.color = (Math.floor(Math.random() * 255) + 1) +','+ (Math.floor(Math.random() * 255) + 1) +','+ (Math.floor(Math.random() * 255) + 1);
    }

    add_round() {
        this.round += 1;
    }

    add_freeze() {
        this.freeze += 1;
    }

    set_line(n) {
        this.line = 19 - n;
    }

    add_line(n) {
        this.line += n;
        if (this.line > 19) {
            this.line = 19;
        }
    }

    remove_line(n) {
        this.line -= n;
        if (this.line < 0) {
            this.line = 0;
        }
    }

    lose() {
        this.loser = true;
    }

    win() {
        this.winner = true
    }
}

module.exports = Player;
