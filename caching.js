var Hapi = require('hapi'),
    good = require('good');

// Create a server with a host and port
var server = Hapi.createServer('127.0.0.1', 8000, {
    cache: 'redis'
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    config:{
        handler: function (req) {
            req.reply('hello world');
        },
        cache: {
           mode: 'client+server',
           expiresIn: 60000
        }
    }
});

server.pack.require('good', {
        subscribers: {
            console: ['request', 'log', 'ops']
        },
        leakDetection: true,
        extendedRequests: true
    },
    function (err){
        if(err){
            throw err;
        }
    }
);

// Start the server
server.start(function(){
    server.log(['info'], 'server started...');
});