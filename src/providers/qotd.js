var qotdService = 'http://quotes.rest/qod.json?category=inspire';
var rp = require('request-promise');

var quotes = [
  'Vulnerability is something to be treasured, not hidden from',
  'The best preparation for tomorrow is doing your best today.',
  'Perfection is not attainable, but if we chase perfection we can catch excellence.',
  'We know what we are, but know not what we may be.',
  'Nothing is impossible, the word itself says I\'m possible!',
  'It is during our darkest moments that we must focus to see the light. ',
  'Believe you can and you\'re halfway there.',
  'No act of kindness, no matter how small, is ever wasted.',
  'Let us sacrifice our today so that our children can have a better tomorrow.',
];



function getNewQotd(){
  return quotes[Math.floor(Math.random() * quotes.length)];
}

console.log(getNewQotd())

var QotdProvider = {
  initSession(socket, server){
    if(server.clients.every(ws => ws._connected)){
      var quote = getNewQotd();
      server.clients.forEach(socket => socket.sendMessage(quote))
    }
  },

  killSession(socket){
    socket.sendMessage('See you later!')
  }

}


module.exports = QotdProvider;