exports.run = function(client, msg, args, db) {
  msg.channel.send(`Pong!`)
}

exports.info = {
  'description': 'Example Command',
  'usage': '!ping',
  'permission': ''
}