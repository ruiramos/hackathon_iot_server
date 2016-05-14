var Hapi = require('hapi');
var spawn = require('child_process').spawn;
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

  server.route({
    method: 'GET',
    path: '/restart',
    handler: function(){
      spawn('npm', ['run', 'start']);
      process.exit(0);
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
