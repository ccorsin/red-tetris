const Game = require("../helpers/game");
const Player = require("../helpers/player");

 describe('Game class is made to represent a game, in a specific room', () => {
    let player1;
    let player2;

    beforeEach(() => {
        player1 = new Player('p1', 'a');
        player2 = new Player('p2', 'b'); 
    });

    it('should instanciate game with given values', () => {
        const values = {
            leader: player1,
            room: 42,
            players: [player1],
            running: false
        };
        const game = new Game(player1, 42);
        expect(game).toMatchObject(values);
    });

    it('should launch game', () => {
        const values = {
            leader: player1,
            room: 42,
            players: [player1],
            running: true
        };
        const game = new Game(player1, 42);
        game.start_game();
        expect(game).toMatchObject(values);
    });

    it('should stop game', () => {
        const values = {
            leader: player1,
            room: 42,
            players: [player1],
            running: false
        };
        const game = new Game(player1, 42);
        game.end_game();
        expect(game).toMatchObject(values);
    });

    it('should add player 2', () => {
        const values = {
            leader: player1,
            room: 42,
            players: [player1, player2],
            running: false
        };
        const game = new Game(player1, 42);
        game.add_player(player2);
        expect(game).toMatchObject(values);
    });

    it('should remove player 1 and update leader', () => {
        const values = {
            leader: player2,
            room: 42,
            players: [player2],
            running: false
        };
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.remove_player(player1);
        expect(game).toMatchObject(values);
    });
 });