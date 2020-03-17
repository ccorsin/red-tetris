const Player = require('../helpers/player');

describe('Player class is made to represent a player, store its name and socket id', () => {
   let player;
   beforeEach(() => { player = new Player('name', 42);});

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });

    it('should increment player round', () => {
        player.add_round();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });

    it('should set score to player', () => {
        player.set_score(3, 2, 1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 3,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 1,
            rows: 2,
            score: 0,
            spectre: []
        });
    });

    it('should set spectre of player', () => {
        player.set_spectre([1, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should add 1 line to player', () => {
        player.set_spectre([1, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        player.add_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should add 1 line to player', () => {
        player.set_spectre([20, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        player.add_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: [20, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should remove 1 line to player', () => {
        player.set_spectre([1, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        player.remove_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should remove 1 line to player', () => {
        player.set_spectre([0, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
        player.remove_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: [0, 2, 1, 1, 1, 1, 1, 1, 1, 1]
        });
    });

    it('should be a loser', () => {
        player.lose();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: true,
            color: player.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });

    it('should freeze 1 line to player', () => {
        player.add_freeze();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 1,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });

    it('should become a winner', () => {
        player.win();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            winner: true,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });

    it('should reset a player', () => {
        player.win();
        player.add_round();
        player.add_freeze();
        const newPlayer = player.reset_player();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 1,
            winner: true,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
        expect(newPlayer).toEqual({
            name: 'name',
            id: 42,
            round: 0,
            loser: false,
            color: newPlayer.color,
            freeze: 0,
            level: 0,
            rows: 0,
            score: 0,
            spectre: []
        });
    });
 });
