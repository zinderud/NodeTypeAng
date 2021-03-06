var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose'),
    swaggerRouteJson=require('./routes/swagger'),
    swaggerRoute=require('./routes/swagger-ui');
 
    var isProduction = process.env.NODE_ENV === 'production';

//Global expressi oluştur
var app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
//static erişim
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/api-docs')));
//todo: swagger uı 
app.use(swaggerRouteJson());
app.use(swaggerRoute());
//session opt.
app.use(session({ secret: 'NodeAng', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));


if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/nodeAngMan');
  mongoose.set('debug', true);
}

require('./models/User');
require('./lib/passport');
require('./models/Article');
require('./models/Comment');
//routes
app.use(require('./routes'));
//hata
app.use(function(req, res, next) {
  var err = new Error('Notr Found');
  err.status = 404;
  next(err);
});

//hata durumu
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

 
// hata durumu
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// start   server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
