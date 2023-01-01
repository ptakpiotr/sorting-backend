const { StatusCodes } = require("http-status-codes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { version } = require("../package.json");


const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "TI Sorting Backend",
            version,
            description: "Project for TI by Piotr Ptak"
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            }
        }
    },
    apis: ['./routes/*.js']
}

const spec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(spec));
}

module.exports = swaggerDocs;