var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('Partida')
    .select()
    .then(usuarios =>{
      res.render('partida/index', { title: "Usuarios", objUsuarios: usuarios });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('partida/new', { title: "Form Users" });
});

function respondAndRenderUser(id,res,viewName){  
  if(typeof id != 'undefined'){
    knex('Partida')
      .select()
      .where('id_partida',id)
      .first()
      .then(usuarios => {
        res.render(viewName,{user: usuarios});
    });
  }else{
    
    console.log('error invalid id ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID user' 
    });    
  }  
}

// router read show /user/id 
router.get('/:id_partida', (req, res) => {
  const id = req.params.id_partida;
  respondAndRenderUser(id,res,'partida/single');
  
});


router.get('/:id_partida/edit', (req,res) => {
  const id = req.params.id_partida;
  console.log('edit id:'+id);
  respondAndRenderUser(id,res,'partida/edit');  
});


function validUser(user){
  return typeof user.puntaje == 'string';
}

function validateUserInsertUpdateRedirect(req,res,callback){
  if(validUser(req.body)){
     //inser into db
    const usuarios = {
      puntaje : req.body.puntaje,
      piezas : req.body.piezas,
      intentos : req.body.intentos,
      usuarios_id : req.body.usuarios_id,
      rompecabeza_id : req.body.rompecabeza_id       
    };    
    callback(usuarios);
    console.log("created");
  }else{
    //responde with an error    
    console.log('error on created');   
    res.status(500);
    res.render('error', {
      message: 'Invalid user at created' 
    });
  }
}

//routing new + form + post
router.post('/', (req, res) => {  
  validateUserInsertUpdateRedirect(req,res,(user) => { 
    knex('Partida')
      .returning('id_partida')
      .insert({ puntaje : req.body.puntaje,
      piezas : req.body.piezas,
      intentos : req.body.intentos,
      usuarios_id : req.body.usuarios_id,
      rompecabeza_id : req.body.rompecabeza_id })
      .then(ids =>  {
        const id = ids[0];
        res.redirect(`/partida/${id}`);
      });
  });
});

router.put('/:id_partida',(req,res) => {
  console.log('updating...');
  validateUserInsertUpdateRedirect(req,res,(user) => {
    knex('Partida')
      .where('id_partida',req.params.id_partida)
      .update({puntaje : req.body.puntaje,
      piezas : req.body.piezas,
      intentos : req.body.intentos,
      usuarios_id : req.body.usuarios_id,
      rompecabeza_id : req.body.rompecabeza_id
              })
      .then( () =>  {
        res.redirect(`/partida/${req.params.id_partida}`);
      });
  });   
});

router.delete('/:id_partida',(req,res)=>{
  const id=req.params.id_partida;
  console.log('deleting...');
             
 if(typeof id != 'undefined'){
    knex('Partida')      
      .where('id_partida',id)
      .del()
      .then(usuarios => {
        console.log('delete id: '+id); 
        res.redirect('/partida');      
    });
    
  }else{
    
    console.log('error invalid delete ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID delete ' 
    });    
  }      
});


module.exports = router;
