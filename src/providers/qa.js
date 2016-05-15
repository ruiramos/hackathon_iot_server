// from the main.js
const STATE = {
  connected: {
    push: 3,
    pull: 4
  }
};

var master, slave;

function getQuestion(){
  return 'How are you?'
}

var Qa = {
  initSession(socket, server, data){

    if(data.state === STATE.connected.push){
      // main one
      master = socket;
    }

    if(data.state === STATE.connected.pull){
      // the one that answers
      slave = socket;
    }

    if(master && slave){
      var q = getQuestion();
      master.sendMessage(q);
      slave.sendMessage(q);

      slave.send(JSON.stringify({event: 'requestAnswer'}));
    }

  },


  killSession(socket){
    master = null;
    slave = null;
    socket.sendMessage('See you later!')
  }
}

module.exports = Qa;