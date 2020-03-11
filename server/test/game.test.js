const Game = require("../helpers/game");
const Player = require("../helpers/player");

 describe('Game class is made to represent a game, in a specific room', () => {
    let player1;
    let player2;
    let player3;

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

    it('should return player position in players array', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        expect(game.isPlayer(game.players, player1)).toEqual(0);
        expect(game.isPlayer(game.players, player2)).toEqual(1);
    });

    it('should add tetriminos', () => {
        const game = new Game(player1, 42);
        game.add_tetriminos();
        expect(game.tetriminos.length).toEqual(1);
        game.add_tetriminos();
        expect(game.tetriminos.length).toEqual(2);
    });

    it('should add 5 tetriminos to start', () => {
        const game = new Game(player1, 42);
        game.init_players_tetriminos();
        expect(game.tetriminos.length).toEqual(5);
    });

    it('add freeze line to other players', () => {
        player1.add_line();
        player2.add_line();
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.freeze_players(player1);
        expect(game.players[0]).toEqual({
            name: 'p1',
            id: 'a',
            line: 0,
            round: 0,
            loser: false,
            color: player1.color,
            freeze: 0
        });
        expect(game.players[1]).toEqual({
            name: 'p2',
            id: 'b',
            line: 2,
            round: 0,
            loser: false,
            color: player2.color,
            freeze: 1
        });
    });

    it('add round to all players', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.update_players_round();
        expect(game.players[0]).toEqual({
            name: 'p1',
            id: 'a',
            line: 0,
            round: 1,
            loser: false,
            color: player1.color,
            freeze: 0
        });
        expect(game.players[1]).toEqual({
            name: 'p2',
            id: 'b',
            line: 0,
            round: 1,
            loser: false,
            color: player2.color,
            freeze: 0
        });
    });

    it('should make p1 loser', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.game_over_player(player1);
        expect(game.players[0]).toEqual({
            name: 'p1',
            id: 'a',
            line: 0,
            round: 0,
            loser: true,
            color: player1.color,
            freeze: 0
        });
    });

    it('should check tetriminos and do not need refill', () => {
        const game = new Game(player1, 42);
        game.init_players_tetriminos();
        expect(game.check_tetriminos(player1)).toEqual(false);
    });

    it('should check tetriminos and need refill', () => {
        const game = new Game(player1, 42);
        game.add_tetriminos();
        game.add_tetriminos();
        expect(game.check_tetriminos(player1)).toEqual(true);
    });

    it('should return -1 of not player in game', () => {
        const game = new Game(player1, 42);
        expect(game.isPlayer(player2)).toEqual(-1);
    });

    it('should say no winner in game', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        expect(game.check_winner()).toEqual(false);
    });

    it('should return winner of game', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.game_over_player(player1);
        expect(game.check_winner()).toEqual(player2);
    });

    it('should reset game', () => {
        const game = new Game(player1, 42);
        game.add_player(player2);
        game.game_over_player(player1);
        game.reset_game();
        expect(game.tetriminos).toEqual([]);
    });
 });