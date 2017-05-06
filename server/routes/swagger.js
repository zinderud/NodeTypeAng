 
var express = require('express')
var swaggerJSDoc = require('swagger-jsdoc')

const router = express.Router();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'NodeTypeAng',
    version: '1.0.0',
    description: 'NodeTypeAng RESTful API with Swagger',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/api/users.js','./server/routes/api/deneme.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


router.route('/api/swagger.json')
  .get((req, res) => {
    res.send(swaggerSpec);
  });

module.exports = () => router;
