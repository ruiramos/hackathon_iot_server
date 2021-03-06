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
  var MessageProvider = require('./providers/qa');
  var wss = new WebSocketServer({
    host: host,
    port: port
  });

  clients = [];

  console.log('WS: Listening on port', port);

  wss.on('connection', function connection(ws) {
    ws.sendMessage = obj => ws.send(JSON.stringify({event: 'setText', text: obj}));
    clients.push(ws);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      var data = JSON.parse(message);

      if(data.event === 'server:connected'){
        ws._connected = true;
        MessageProvider.initSession(ws, wss, data);
      } else if(data.event === 'server:disconnected'){
        ws._connected = false;
        MessageProvider.killSession(ws, wss);
      } else {
        broadcast(message, ws);
      }
    });
  });
}

module.exports = {
  init
}
