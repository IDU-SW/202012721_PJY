const express = require('express');
const router = express.Router();
const games = require('../model/PhoneGameModel');

router.get('/phonegames', showPhoneGameList);
router.get('/phonegames/:gameId', showPhoneGameDetail);
router.post('/phonegames', addPhoneGame);

module.exports = router;

function showPhoneGameList(req, res) {
    const gameList = games.getPhoneGameList();
    const result = { data:gameList, count:gameList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showPhoneGameDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const gameId = req.params.gameId;
        console.log('gameId : ', gameId);
        const info = await games.getPhoneGameDetail(gameId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새  추가
// POST 요청 분석 -> 바디 파서
async function addPhoneGame(req, res) {
    const title = req.body.title;
    

    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }
    const company = req.body.company;
    const platform = req.body.platform;
    const synopsis = req.body.synopsis;

    try {
        const result = await games.addPhoneGame(title, company, platform, synopsis);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}