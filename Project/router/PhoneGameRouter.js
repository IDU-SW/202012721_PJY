const express = require('express');
//const session = require('express-session');
const router = express.Router();
const gamesModel = require('../model/PhoneGameModel');

//리스트보기
router.get('/phonegames', getphonegameList);                // 리스트 조회
router.get('/phonegames/add', addPhoneGameForm);            // 추가 화면
router.get('/phonegames/:gameId', getPhoneGameDetail);      // 상세보기
router.get('/phonegames/detail/:gameId', phoneGameEditForm);// 수정 화면
router.post('/phonegames', addPhoneGame);                   // 추가
router.post('/phonegames/edit', updatePhoneGame);           // 수정
router.post('/phonegames/delete', delPhoneGame);            // 삭제
/*

router.get('/phonegames/login', loginForm);
router.get('/phonegames/logout', logout);



router.post('/phonegames/login', login);


*/
module.exports = router;

// 리스트 조회
async function getphonegameList(req, res){
    phonegameList = await gamesModel.getPhonegameList();
    res.render('phonegames', {phonegames:phonegameList});
}

// 추가 화면
function addPhoneGameForm(req, res){
    res.render('phonegameAdd');
}

// 추가
async function addPhoneGame(req, res){
    const title = req.body.title;
    const company = req.body.company;
    const platform = req.body.platform;
    const synopsis = req.body.synopsis;

    try{
        await gamesModel.addPhonegame(title, company, platform, synopsis);
        res.redirect('/phonegames')
    }
    catch (err) {
        res.status(500).send(error.msg);
    }
}

//상세 보기
async function getPhoneGameDetail(req, res){
    try {
        let gameId = req.params.gameId;
        let info = await gamesModel.getPhonegameDetail(gameId);
        res.render("phonegamesDt", {detail:info});
    }
    catch ( error ) {
        res.status(error.code).send({msg:error.msg});
    }
}

// 수정폼
async function phoneGameEditForm(req, res){
    try {
        let gameId = req.params.gameId;
        let info = await gamesModel.getPhonegameDetail(gameId);
        res.render("phonegameUpdate", {detail:info});
    }
    catch ( error ) {
        res.status(error.code).send({msg:error.msg});
    }
}

//수정
async function updatePhoneGame(req, res){
    try {
        const gameId = req.body.gameId;
        const title = req.body.title;
        const company = req.body.company;
        const platform = req.body.platform;
        const synopsis = req.body.synopsis;
        
        await gamesModel.updatePhonegame(gameId, title, company, platform, synopsis);
        
        res.redirect('/phonegames')
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(500).send(error.msg);
    }
}

//삭제
async function delPhoneGame(req, res) {
    try {
        let gameId = req.body.id;
        await gamesModel.delPhonegame(gameId);
        res.redirect('/phonegames')
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}