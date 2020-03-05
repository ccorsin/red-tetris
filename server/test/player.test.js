const Player = require('../helpers/player');

 describe('Player class is made to represent a player, store its name and socket id', () => {
    let player;
    beforeEach(() => { player = new Player('name', 42);});

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0
        });
    });

    it('should increment player round', () => {
        player.add_round();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 0
        });
    });

    it('should add 1 line to player', () => {
        player.add_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 1,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0
        });
    });

    it('should set 5 line in reverse order to player', () => {
        player.set_line(5);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 14,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0
        });
    });

    it('should remove 1 line to player', () => {
        player.add_line();
        player.add_line();
        player.remove_line();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 1,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0
        });
    });

    it('should be a loser', () => {
        player.lose();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: true,
            color: player.color,
            freeze: 0
        });
    });

    it('should freeze 1 line to player', () => {
        player.add_freeze();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 1
        });
    });

    it('should become a winner', () => {
        player.win();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: false,
            color: player.color,
            freeze: 0,
            winner: true
        });
    });

    it('should reset a player', () => {
        player.win();
        player.add_round();
        player.add_line();
        player.add_freeze();
        const newPlayer = player.reset_player();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 1,
            round: 1,
            loser: false,
            color: player.color,
            freeze: 1,
            winner: true
        });
        expect(newPlayer).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: false,
            color: newPlayer.color,
            freeze: 0
        });
    });
 });