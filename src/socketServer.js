var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;

var clients;

function broadcast(data, from){
  var sends = 0;
  clients
    .filter(client => client !== from && client.readyState === WebSocket.OPEN)
    .forEach(client => {
      client.send(data);
      sends++;
    });

  console.log('* Sent ', data, ' to ', sends, 'clients');
};

function init(host, port){
  var wss = new WebSocketServer({
    host: host, 
    port: port
  });

  clients = [];

  console.log('WS: Listening on port', port);

  wss.on('connection', function connection(ws) {
    clients.push(ws);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      broadcast(message, ws);
    });
  });
}

module.exports = {
  init
}
