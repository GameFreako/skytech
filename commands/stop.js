exports.run = function(client, msg, args, db) {
if (!msg.member.voiceChannel || msg.member.voiceChannel.name !== "music") {
      msg.channel.send(`You are not listening to the music, so you cannot stop it!`);
      return;
    };
    var dispatch = client.voiceConnections.array()[0].dispatcher.end();
}

exports.info = {
  'description': 'Stop/Skip the music',
  'usage': '!stop',
  'permission': ''
}