var express = require('express');
var router = express.Router();



router.get('/',(req, res)=>{
    
    res.json({
        message:'dsjkhfsdj'
    });
    
});

function ValidUser(user){
    const validEmail= typeof user.usuario=='string'&&
          user.usuario.trim() !='';
    
     const validPassword= typeof user.password=='string'&&
          user.password.trim() !=''; 
              user.password.trim().length>=6;
    return
    validEmail && validPassword;
    
}


router.post('/signup',(req, res)=>{
    
    if(validUser(req,body)){
         res.json({
        message:'desactivado'
    });
    
    }else{
        message:"Invalide User";
    }
    
});




module.exports = router;
