const fs = require('fs');
const Sequelize = require('sequelize');
//const dbConnectUri = 'mysql://localhost@127.0.0.1:3306/hellojs';
const sequelize = new Sequelize(
    'hellojs',
    'root',
    'cometrue',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
); 

class Phonegames extends Sequelize.Model { }
Phonegames.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING(30),
    company: Sequelize.STRING(30),
    platform: Sequelize.STRING(20),
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

    //리스트 조회
    async getPhonegameList() {
        var lists = await Phonegames.findAll();
        return lists;
    }

    //추가
    async addPhonegame(title, company, platform, synopsis) {
        let newPhonegame = { title, company, platform, synopsis };
        try{
            var newData = await this.gameData(newPhonegame);
            return newData;
        } catch (err){
            console.log(err);
        }
    }

    async gameData(phonegame) {
        try {
            const ret = await Phonegames.create({
                title: phonegame.title,
                company: phonegame.company,
                platform: phonegame.platform,
                synopsis: phonegame.synopsis,
            }, {logging: false});
            const newData = ret.dataValues;
            return newData;
        }catch(error){
            console.error(error);
        }
    }

    //상세 보기
    async getPhonegameDetail(phonegameId) {
        try {
            var result = await Phonegames.findAll({where: {id:phonegameId}});
            if(result)
                return result[0];
            else
                console.error(error);
        }catch(error){
            console.error(error);
        }
    }

    //수정
    async updatePhonegame(gameId, title, company, platform, synopsis) {
        try {
            let phonegame = await Phonegames.findByPk(gameId);
            
            phonegame.title = title;
            phonegame.company = company;
            phonegame.platform = platform;
            phonegame.synopsis = synopsis;
            await phonegame.save();
        }
        catch (error) {
            console.error(error);
        }
    }

    //삭제
    async delPhonegame(gameId) {
        try {
            await Phonegames.destroy({where: {id:gameId}});
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Phonegame();