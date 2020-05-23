var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hellojs';
var ObjectID = require('mongodb').ObjectID;

var db;

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.error('MongoDB 연결 실패', err);
        return;
    }
    db = client.db();
});

class Phonegames { }


Phonegames.getPhoneGameList = () => {   
    return db.collection('movies').find({}).toArray()   
}
 
Phonegames.getPhoneGameDetail = (id) => {
    return db.collection('movies').findOne({_id:new ObjectID(id)})
}
    

Phonegames.addPhoneGame = (getTitle, getCompany, getPlatform, getSynopsis) => {
    const phonegames = db.cllection('phonegames');

    // 이게 맞나
    phonegames.insertOne({title: getTitle, company: getCompany, platform: getPlatform, synopsis: getSynopsis});
}


module.exports = new PhoneGame();