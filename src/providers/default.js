module.exports = {
  initSession(socket){
    socket.send({
      event: 'setText',
      text: 'Hi there!'
    });

    setTimeout(() => socket.send({
      event: 'setText',
      text: 'Nice to have you around'
    }),2000);

    setTimeout(() => socket.send({
      event: 'setText',
      text: 'Please feel free to stay around for longer'
    }),4000)

  },

  killSession: function(socket){
    socket.send({setText: '** Bye! **'});
  }
}