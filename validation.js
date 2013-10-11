var Hapi = require('hapi');
var Joi = require('joi');

// Create a server with a host and port
var server = Hapi.createServer('127.0.0.1', 8000, {});

// Add the route
server.route([
    {
        method: 'GET',
        path: '/hello/{name}',
        config: {
            handler: function (req) {
                req.reply('hello ' + req.params.name);
            },
            validate:{
                path: {
                    name: Joi.types.String().regex(/Orlando|Richard|Potato/i)
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/people/{id}',
        config: {
            handler: function (req) {
                req.reply('hello ' + req.params.id);
            },
            validate:{
                path: {
                    id: Joi.types.Number().integer().min(0)
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/people/{id}',
        config: {
            handler: function (req) {
                req.reply('hello ' + req.payload.name);
            },
            validate:{
                path: {
                    id: Joi.types.Number().integer().min(0)
                },
                payload:{
                    id: Joi.types.Number().integer().min(0),
                    name: Joi.types.String().regex(/Orlando|Richard|Potato/i),
                    tags: Joi.types.Array().includes('foo', 'bar'),
                    address: Joi.types.Object({
                        line1: Joi.types.String().emptyOk(),
                        line2: Joi.types.String().emptyOk(),
                        city: Joi.types.String().emptyOk(),
                        postcode: Joi.types.String().emptyOk()
                    })
                }
            }
        }
    }
]);

// Start the server
server.start();