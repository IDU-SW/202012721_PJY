const fs = require('fs');

class PhoneGame {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.phoneGames = JSON.parse(data)
    }

    getPhoneGameList() {
        if (this.phoneGames) {
            return this.phoneGames;
        }
        else {
            return [];
        }
    }

    addPhoneGame(title, company, platform, synopsis) {
        return new Promise((resolve, reject) => {
            let last = this.phoneGames[this.phoneGames.length - 1];
            let id = last.id + 1;

            console.log(id);
            console.log(title);
            console.log(company);
            console.log(platform);
            console.log(synopsis);

            let newGame = {id, title, company, platform, synopsis};
            this.phoneGames.push(newGame);

            resolve(newGame);
        });
    }

    getPhoneGameDetail(gameId) {
        return new Promise((resolve, reject) => {
            for (var game of this.phoneGames ) {
                if ( game.id == gameId ) {
                    resolve(game);
                    return;
                }
            }
            reject({msg:'Can not find game', code:404});
        });
    }
}

module.exports = new PhoneGame();