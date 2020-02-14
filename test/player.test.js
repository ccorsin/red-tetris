import Player from "../src/server/helpers/player"

 describe('Player class is made to represent a player, store its name and socket id', () => {
    let player;
    beforeEach(() => { player = new Player('name', 42);});

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42
        })
    })
 })