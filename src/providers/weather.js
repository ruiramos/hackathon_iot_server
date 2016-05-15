module.exports = {
  initSession(socket, server){
    socket._connected = true;

    if(wss.clients.every(server => ws._connected)){
      socket.sendObject({
        event: 'setText',
        text: 'all ready!'
      })
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