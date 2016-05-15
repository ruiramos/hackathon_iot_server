module.exports = {
  initSession(socket, server){
    socket._connected = true;

    if(server.clients.every(ws => ws._connected)){
      var otherSocket = server.clients.filter(ws => ws !== socket)[0] || socket;
      var ip = otherSocket._socket.remoteAddress;

      // use sensors maybe???

      socket.sendObject({
        event: 'setText',
        text: 'Location - 18o clear sunny'
      });

    }
  },

  killSession(socket, server){
    socket._connected = false;
    socket.sendObject({
      event: 'setText',
      text: 'byeeee'
    })
  }
}

// ws._socket.remoteAddress