var Hapi = require('hapi');
var spawn = require('child_process').spawn;
var server;

function init(host, port){
  server = new Hapi.Server();
  server.connection({port: port});

  // server.register(require('inert'), () => {
  //   server.route({
  //     method: 'GET',
  //     path: '/',
  //     handler: function(request, reply){
  //       reply.file('./index.html');
  //     }
  //   });
  // })
  server.register(require('inert'), () => {
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: './'
          }
      }
    });
  })

  server.start((err) => {
    if(err) throw err;
    console.log('HTTP server running at:', server.info.uri )
  });
}

module.exports = {
  init
}
