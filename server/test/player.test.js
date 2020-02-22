const Player = require('../src/server/helpers/player');

 describe('Player class is made to represent a player, store its name and socket id', () => {
    let player;
    beforeEach(() => { player = new Player('name', 42);});

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: false
        });
    });

    it('should increment player round', () => {
        player.add_round();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 1,
            loser: false
        });
    });

    it('should add 1 line to player', () => {
        player.add_line(1);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 1,
            round: 0,
            loser: false
        });
    });

    it('should remove 1 line to player', () => {
        player.add_line(5);
        player.remove_line(2);
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 3,
            round: 0,
            loser: false
        });
    });

    it('should be a loser', () => {
        player.lose();
        expect(player).toEqual({
            name: 'name',
            id: 42,
            line: 0,
            round: 0,
            loser: true
        });
    });
 });