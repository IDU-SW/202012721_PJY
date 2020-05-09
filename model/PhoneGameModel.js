var pool = require('./dbConnection');

const fs = require('fs');

class PhoneGame {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.phoneGames = JSON.parse(data)
    }

    //리스트 조회
    getPhoneGameList = async() => {   
        const sql = 'SELECT * from phonegames'
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql);
            conn.release();
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }

    getPhoneGameDetail = async(gameId) => {
        const sql = 'SELECT * from phonegames where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, gameId);
            conn.release();
            console.log(rows);
            return rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }

    addPhoneGame = async(title, company, platform, synopsis) => {

        console.log(title);
        console.log(company);
        console.log(platform);
        console.log(synopsis);

        const data = [title, company, platform, synopsis];
        const sql = 'insert into phonegames(title,company,platform,synopsis) values(?, ?, ?, ?)';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, data);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }

//    getPhoneGameDetail(gameId) {
//        return new Promise((resolve, reject) => {
//           for (var game of this.phoneGames ) {
//                if ( game.id == gameId ) {
//                    resolve(game);
//                    return;
//                }
//            }
//            reject({msg:'Can not find game', code:404});
//        });
//    }



    upPhoneGame = async(gameId, title, company, platform, synopsis) => {
        const data = [title, company, platform, synopsis, gameId];
        const sql = 'update phonegames set title = ?, company = ?, platform = ?, synopsis = ? where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, data);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }

    delPhoneGame = async(id) => {
        
        const sql = 'delete from phonegames where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, id);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }
}


module.exports = new PhoneGame();