const express = require('express');
const session = require('express-session');
const router = express.Router();
const games = require('../model/PhoneGameModel');

const user = {
    id : 'id',
    password : '1234',
    name : 'Name'
 }

//리스트보기
router.get('/phonegames', async (req, res) => {
    const data = await games.getPhoneGameList();
    
    res.render('phonegames', {phonegames:data, count:data.length});
});
router.get('/phonegames/add', addPhoneGameForm);
router.get('/phonegames/login', loginForm);
router.get('/phonegames/logout', logout);
router.get('/phonegames/:gameId', showPhoneGameDetail);
router.post('/phonegames', addPhoneGame);
router.post('/phonegames/delete', delPhoneGame);
router.post('/phonegames/login', login);
router.get('/phonegames/detail/:gameId', upPhoneGameForm);
router.post('/phonegames/edit', upPhoneGame);

module.exports = router;

// 리스트보기
//function showPhoneGameList(req, res) {
//    const data = games.getPhoneGameList();
//    console.log('rows',data);
//    res.render('phonegames', {phonegames:data, count:data.count})
//}

// 상세보기
async function showPhoneGameDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const gameId = req.params.gameId;
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
        if (result != -1)
            res.render('addComplete');
        else
            res.render('error');
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

        if (info != -1)
            res.render('phonegameUpdate', {detail:info});
        else
            res.render('error');
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
        if (result != -1)
            res.render('upComplete');
        else
            res.render('error');
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
        
        if (result != -1)
            res.render('delComplete');
        else
            res.render('error');
    }
    catch ( error ) {
        res.status(400).send({error:'게임 삭제에 실패'});
    }
}

function loginForm(req, res) {
    res.render('login');
}

async function login(req, res) {
    if ( id, pw === user.id, user.pw ) {
        req.session.userid = id;
        res.sendStatus(200);
        res.render('loginComplete');
    }
}

async function logout(req, res){
    session = req.session;
    if(session.id){
        req.session.destrory(function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
}
