var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('127.0.0.1', 8000, {});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    config: {
        handler: function (req) {

            req.reply('hello world');
        }
    }
});

// Start the server
server.start();