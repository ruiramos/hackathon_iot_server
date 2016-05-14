module.exports = {
  initSession(socket){
    socket.sendObject({
      event: 'setText',
      text: 'Hi there!'
    });

    setTimeout(() => socket.sendObject({
      event: 'setText',
      text: 'Nice to have you around'
    }),2000);

    setTimeout(() => socket.sendObject({
      event: 'setText',
      text: 'Please feel free to stay around for longer'
    }),4000)

  },

  killSession: function(socket){
    socket.sendObject({
      event: 'setText',
      text:'** Bye! **'
    });
  }
}