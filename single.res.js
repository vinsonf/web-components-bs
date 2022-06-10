const db = {
    "players": [],
    "games": [],
}

class Game {
    constructor(player1, player2) {
        this.assignPlayers(player1, player2);
        this.setPlayerHealth();
    }
    assignPlayers(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }
    setPlayerHealth() {
        this.player1Health = 3;
        this.player2Health = 3;
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.readyForMatch = false;
    }
}

const PlayerService = {
    checkAvailablePlayers(){
        return db.players.filter(player => player.readyForMatch === true);
    },
    findOtherPlayer(name) {
        return this.checkAvailablePlayers().filter(player => player.name !== name)[0];
    },
    setPlayerReady(name) {
        db.players.find(player => player.name === name).readyForMatch = true;
    },
}

const ClientService = {
    updateClientPlayers: function() {
        client1.displayPlayers( db.players)
        client2.displayPlayers( db.players)
    },
}

const server = { // connect the client to the data
    addPlayer: function(name) {
        db.players.push(new Player(name));
        ClientService.updateClientPlayers();
    },
   
    startMatch(name) {
        this.PlayerService.setPlayerReady(name);
        const otherPlayer = PlayerService.findOtherPlayer(name);
        this.createGame(name, otherPlayer);
    },
    createGame(name, otherPlayer) {
        if (otherPlayer) {
            db.games.push(new Game(name, otherPlayer.name));
            ClientService.updateClientGames();
        }
    },

}

const client1 = { // display to the user the data and collect user input to send to the server
    name: "",
    addPlayer(name){
        server.addPlayer(name);
        this.name = name;
    },
    displayPlayers: function(players) {},
    startMatch(){
        server.startMatch(this.name);
    }
}

const client2 = {
    displayPlayers: function(players) {}
}

client1.addPlayer("John");
client2.addPlayer("Jane");