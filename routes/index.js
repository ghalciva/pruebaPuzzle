var express = require('express');
var router = express.Router();

var fortune = require('../lib/fortune.js');


router.get('/', function (req, res) {
    res.render('front/', {title: "Index Home"});
});

router.get('/avatar', function(req, res) {
    res.render('front/avatar');
});

router.get('/avatarEscogido', function(req, res) {
    res.render('front/avatarEscogido');
});

router.get('/juegos', function(req, res) {
    res.render('front/juegos');
});

router.get('/puzzle', function(req, res) {
    res.render('front/puzzle');
});

router.get('/puzzle2', function(req, res) {
    res.render('front/puzzle2');
});

router.get('/puzzle3', function(req, res) {
    res.render('front/puzzle3');
});

//formato reducido para renderizar la vista 
router.get('/thank-you', (req, res) => res.render('thank-you') );

//usa modulos de la libreria fortune.js
router.get('/about', function(req, res){
  res.render('about', { fortune: fortune.getFortune() });
});


//++++++++++++++++++FORMS ++++++++++++++++++++

// route login form
router.get('/login', function(req, res){
  res.render('login', { csrf: 'ABCD token' });
});

// get data from form in order to save on database
router.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('User (from visible form field): ' + req.body.usuario);
  console.log('Password (from visible form field): ' + req.body.password);
  res.redirect(303, '/about');
    //res.redirect(303, '/thank-you');
});


module.exports = router;


