var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');
//Login

//funcion que ejecuta el request para obtener el usuario ya logeado


router.get('/login/:id', (req, res)=>{

  const id = req.params.id;
    console.log(id)
  knex('Administrador')
      .where('id_administrador', id)
      .first()
      .then((user) => {
        if(user!=undefined) {
          console.log(user)
          //res.redirect(/usuarios);
          res.json({user:user})
          //res.render(login/sesion, {user:user})
        }else {
          //res.redirect("/login");
        }
      });

});

//funcion para redireccionar al formulario de logeo
router.get('/login', (req, res) => {
         
      res.render('user/login');
   
});


router.post('/auth', (req, res) => {  
 const usuario=req.body.usuario;
 const password=req.body.password;
   console.log("prueba",usuario); 
  knex('Administrador')
  .where({ usuario: usuario })
  .select('password')
  .select('id_administrador')  
  .then(function(result) {
    if (!result || !result[0])  {  // not found!
      console.log("Invalido user"); 
      return;
    }
    var pass = result[0].password;
    if (password === pass) {
        var user= result[0].id_administrador;
        console.log("usuario", user);
        
      res.render('user/prueba', {user: user});
    } else {
      console.log("Vale Verga Frada"); 
    }
  })
  .catch(function(error) {
    console.log(error);
});
});

//routing read database postgrsql
router.get('/', (req, res) => {
  knex('Administrador')
    .select()
    .then(usuarios =>{
      res.render('user/index', { title: "Usuarios", objUsuarios: usuarios });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('user/new', { title: "Form Users" });
});

function respondAndRenderUser(id,res,viewName){  
  if(typeof id != 'undefined'){
    knex('Administrador')
      .select()
      .where('id_administrador',id)
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
router.get('/:id_administrador', (req, res) => {
  const id = req.params.id_administrador;
  respondAndRenderUser(id,res,'user/single');
  
});


router.get('/:id_administrador/edit', (req,res) => {
  const id = req.params.id_administrador;
  console.log('edit id:'+id);
  respondAndRenderUser(id,res,'user/edit');  
});


function validUser(user){
  return typeof user.usuario == 'string';
}

function validateUserInsertUpdateRedirect(req,res,callback){
  if(validUser(req.body)){
     //inser into db
    const usuarios = {
      usuario : req.body.usuario,
      password : req.body.password,
      rol : req.body.rol        
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
    knex('Administrador')
      .returning('id_administrador')
      .insert({usuario : req.body.usuario,
      password : req.body.password,
      rol : req.body.rol  })
      .then(ids =>  {
        const id = ids[0];
        res.redirect(`/user/${id}`);
      });
  });
});

router.put('/:id_administrador',(req,res) => {
  console.log('updating...');
  validateUserInsertUpdateRedirect(req,res,(user) => {
    knex('Administrador')
      .where('id_administrador',req.params.id_administrador)
      .update({usuario : req.body.usuario,
      password : req.body.password,
      rol : req.body.rol   })
      .then( () =>  {
        res.redirect(`/user/${req.params.id_administrador}`);
      });
  });   
});

router.delete('/:id_administrador',(req,res)=>{
  const id=req.params.id_administrador;
  console.log('deleting...');
             
 if(typeof id != 'undefined'){
    knex('Administrador')      
      .where('id_administrador',id)
      .del()
      .then(usuarios => {
        console.log('delete id: '+id); 
        res.redirect('/user');      
    });
    
  }else{
    
    console.log('error invalid delete ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID delete ' 
    });    
  }      
});




/*
router.post('/login/:usuario:password', (req, res) => {
    const usu=req.params.usuario;
     const pass=req.params.password;
    
  knex('Administrador')
    .select()
    .where('usuario, password',usuario, password)
    .then(usuarios =>{
      res.render('/user/login', { title: "Usuarios", objUsuarios: usuarios });
  });  
});

*/
module.exports = router;
