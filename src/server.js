var config = require('./server.conf.js');

var socketServer = require('./socketServer');
socketServer.init(config.wsHost, config.wsPort);

var httpServer = require('./httpServer');
httpServer.init(config.httpHost, config.httpPort);
