const express = require('express');
const router = express.Router();
const games = require('../model/PhoneGameModel');

router.get('/phonegames', showPhoneGameList);
router.get('/phonegames/:gameId', showPhoneGameDetail);
router.post('/phonegames', addPhoneGame);
router.get('/phonegame/add', addPhoneGameForm);
router.post('/phonegames/delete', delPhoneGame);
router.get('/phonegame/detail/:gameId', upPhoneGameForm);
router.post('/phonegames/edit', upPhoneGame);
module.exports = router;

// 리스트보기
function showPhoneGameList(req, res) {
    const gameList = games.getPhoneGameList();
    res.render('phonegames', {phonegames:gameList, count:gameList.length})
}

// 상세보기
async function showPhoneGameDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const gameId = req.params.gameId;
        console.log('gameId : ', gameId);
        const info = await games.getPhoneGameDetail(gameId);

        res.render('phonegamesDt', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 추가 창 이동
function addPhoneGameForm(req, res) {
    res.render('phonegameAdd');
}

// 추가
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
        res.render('addComplete',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 수정 창 이동
async function upPhoneGameForm(req, res) {
    try {
        // 영화 상세 정보 Id
        const gameId = req.params.gameId;
        console.log('gameId : ', gameId);
        const info = await games.getPhoneGameDetail(gameId);

        res.render('phonegameUpdate', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 수정
async function upPhoneGame(req, res) {

    const id = req.body.id; // id 가져오기
    const title = req.body.title;

    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }
    const company = req.body.company;
    const platform = req.body.platform;
    const synopsis = req.body.synopsis;

    try {
        const result = await games.upPhoneGame(id, title, company, platform, synopsis);
        res.render('upComplete',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 삭제
async function delPhoneGame(req, res) {
    try {
        const id = req.body.id; // id 가져오기
        const result = await games.delPhoneGame(id);
        res.render('delComplete');
    }
    catch ( error ) {
        res.status(400).send({error:'게임 삭제에 실패'});
    }
}