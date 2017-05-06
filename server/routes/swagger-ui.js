
var express = require('express')
var path = require('path')
var swaggerJSDoc = require('swagger-jsdoc')

const swagger = express.Router();

swagger.route('/docs')
  .get((req, res) => {
    res.status(200)
      .sendFile(path.resolve('api-docs', 'index.html'));
  });

module.exports = () => swagger;
