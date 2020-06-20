//var pool = require('./dbConnection');
const Sequelize = require('sequelize');
var sequelize = require('./dbConnection');
const fs = require('fs');

class Phonegames extends Sequelize.Model { }

Phonegames.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING(255),
    company: Sequelize.STRING(255),
    platform: Sequelize.STRING(255),
    synopsis: Sequelize.STRING(1000),
}, { tableName: 'Phonegames', timestamps: false, sequelize });

class Phonegame_reply extends Sequelize.Model { }

Phonegame_reply.init({
    phonegame_id: Sequelize.INTEGER,
    reply: Sequelize.STRING(100),

}, { tableName: 'Phonegame_reply', timestamps: false, sequelize });

class Phonegame {
    constructor() {
        try {
            this.prepareModel();
        } catch (error) {
            console.error(error);
        }
    }

    async prepareModel() {
        try {
            await Phonegames.sync({ force: true });
            await Phonegame_reply.sync({ force: true });
            Phonegames.hasMany(Phonegame_reply, { foreignKey: 'phonegame_id' });
            // sequelize.close();
        }
        catch (error) {
            console.log('country.sync Error ', error);
        }
    }
}

//리스트 조회
function getPhonegameList() {
    Phonegame.findAll({})
    .then( results => {
        for (var item of results) {
            
        }
    })
}
/*
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
*/
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

// 추가
async function addPhoneGame(getTitle, getCompany, getPlatform, getSynopsis){
    try {
        const ret = await Movie.create({
            title: getTitle,
            company: getCompany,
            platform: getPlatform,
            synopsis: getSynopsis
        }, {logging: false});
        const newData = ret.dataValues;
        console.log(newData);
        console.log('Create success');
    }
    catch (error) {
        console.log('Error : ', error);
    }
}

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



module.exports = new Phonegame();