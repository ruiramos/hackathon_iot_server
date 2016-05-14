var Hapi = require('hapi');
var server;

function init(host, port){
  server = new Hapi.Server();
  server.connection({port: port});

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      reply('Hello world');
    }
  });

  server.start((err) => {
    if(err) throw err;
    console.log('HTTP server running at:', server.info.uri )
  });
}

module.exports = {
  init
}
