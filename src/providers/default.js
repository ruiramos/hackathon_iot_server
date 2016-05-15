module.exports = {
  initSession(socket){
    socket.sendMessage('Hi there!');
  },

  killSession: function(socket){
    socket.sendMessage('Bye');

  }
}