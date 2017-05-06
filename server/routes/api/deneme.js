 
var router = require('express').Router();
 

router.get('/deneme', function(req, res, next){
 res.send('hello world');
});

 
module.exports = router;
