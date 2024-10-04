const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API for borrowing books in a library system',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
      },
    ],
  },
  apis: ['./docs/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = { swaggerDocs, swaggerUi };