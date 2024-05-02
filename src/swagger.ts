import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes.ts']; 

const doc = {
  info: {
    title: 'Nome do seu projeto',
    description: 'Descrição do seu projeto',
  },
  host: 'localhost:3333', 
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apiKeyAuth:{
        type: "apiKey",
        in: "header",       // can be "header", "query" or "cookie"
        name: "X-API-KEY",  // name of the header, query parameter or cookie
        description: "any description..."
    }
},
  definitions: {
    AddUser: {
      $name: 'Alysson Colombo',
      $age: 25,
      about: ''
    }
  }
};

 swaggerAutogen(outputFile, endpointsFiles, doc)
