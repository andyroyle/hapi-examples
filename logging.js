var Hapi = require('hapi'),
    good = require('good');

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

server.pack.require('good', {
        subscribers: {
            console: ['request', 'log', 'ops'],
            'logs/': ['request', 'log', 'ops'],
            'http://some.http.endpoint/log': ['request'],
            'udp://some.syslog.server:1234': ['log']
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