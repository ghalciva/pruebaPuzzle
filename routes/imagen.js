var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('Imagenes')
    .select()
    .then(usuarios =>{
      res.render('imagen/index', { title: "Usuarios", objUsuarios: usuarios });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('imagen/new', { title: "Form Users" });
});

function respondAndRenderUser(id,res,viewName){  
  if(typeof id != 'undefined'){
    knex('Imagenes')
      .select()
      .where('id_imagen',id)
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
router.get('/:id_imagen', (req, res) => {
  const id = req.params.id_imagen;
  respondAndRenderUser(id,res,'imagen/single');
  
});


router.get('/:id_imagen/edit', (req,res) => {
  const id = req.params.id_imagen;
  console.log('edit id:'+id);
  respondAndRenderUser(id,res,'imagen/edit');  
});


function validUser(user){
  return typeof user.descripcion == 'string';
}

function validateUserInsertUpdateRedirect(req,res,callback){
  if(validUser(req.body)){
     //inser into db
    const usuarios = {
      imagen : req.body.imagen,
      descripcion : req.body.descripcion,
      id_partida : req.body.id_partida       
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
    knex('Imagenes')
      .returning('id_imagen')
      .insert({ imagen : req.body.imagen,
      descripcion : req.body.descripcion,
      id_partida : req.body.id_partida  })
      .then(ids =>  {
        const id = ids[0];
        res.redirect(`/imagen/${id}`);
      });
  });
});

router.put('/:id_imagen',(req,res) => {
  console.log('updating...');
  validateUserInsertUpdateRedirect(req,res,(user) => {
    knex('Imagenes')
      .where('id_imagen',req.params.id_imagen)
      .update({
        imagen : req.body.imagen,
        descripcion : req.body.descripcion,
        id_partida : req.body.id_partida 
              })
      .then( () =>  {
        res.redirect(`/imagen/${req.params.id_imagen}`);
      });
  });   
});

router.delete('/:id_imagen',(req,res)=>{
  const id=req.params.id_imagen;
  console.log('deleting...');
             
 if(typeof id != 'undefined'){
    knex('Imagenes')      
      .where('id_imagen',id)
      .del()
      .then(usuarios => {
        console.log('delete id: '+id); 
        res.redirect('/imagen');      
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
