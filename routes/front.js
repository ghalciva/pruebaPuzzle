var express = require('express');
var router = express.Router();
//const knex = require('../db/knex');

router.get('/', (req, res) => {
      console.log("hola");   
      res.render('front/index');
   
});

router.get('/avatar', (req, res) => {
       
      res.render('front/avatar');
   
});

router.get('/avatarEscogido', (req, res) => {
       
      res.render('front/avatarEscogido');
   
});

router.get('/juegos', (req, res) => {
       
      res.render('front/juegos');
   
});


router.get('/puzzle', (req, res) => {
       
      res.render('front/puzzle');
   
});


router.get('/puzzle2', (req, res) => {
       
      res.render('front/puzzle2');
   
});


router.get('/puzzle3', (req, res) => {
       
      res.render('front/puzzle3');
   
});


router.get('/login', (req, res) => {
       
      res.render('user/login');
   
});

router.get('/administradorP', (req, res) => {
       
      res.render('front/administradorP');
   
});

router.get('/admin', (req, res) => {
       
      res.render('front/admin');
   
});





module.exports = router;
