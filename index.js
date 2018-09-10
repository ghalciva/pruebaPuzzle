const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000 ;
var methodOverride = require('method-override');
//app.use(express.static('public'));

var env = process.env.NODE_ENV || 'development';

var fortune = require('./lib/fortune.js');
var exphbs  = require('express-handlebars');

//add modules routers
var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var partidas = require('./routes/partida.js');
var front = require('./routes/front.js');

var images = require('./routes/images.js');
var auth=require('./auth');

var app = express();

//knex logger
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//add bodyParser for use of GET & POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));


//archivos estáticos
app.use(express.static(path.join(__dirname,'/public')));

//override method for put + edit
app.use(methodOverride('_method'));

// set routers global vars
app.use('/',routes);
app.use('/user',users);
app.use('/partida',partidas);
app.use('/imagen',images);
app.use('/auth', auth);
app.use('/front', front);

// indicamos que del fichero upload.js haga mención a la función upload, para cargar el formulario html
//app.get('/images',images); 
// indicamos que del fichero upload.js haga mención a la función Uploads para subir la imagen.
//app.post('/images', images);
//505 error page
app.get('/error', function(req, res){
  res.status(500).render('error');
});


//505 error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).render('error');
});

//404 not found, handler
app.use(function(req, res){
  res.status(404).render('not-found');
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

 
