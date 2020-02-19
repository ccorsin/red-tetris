export default class Player {
    constructor (name, id) {
        this.name = name
        this.id = id
        this.line = 0
        this.round = 0
        this.loser = false
    }

    add_round() {
        this.round += 1;
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
        this.loser = true
    }
}