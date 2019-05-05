exports.run = function(client, msg, args, db) {
  var config = require('../config.json')
  if (msg.author.username === "Zogy7") {
    client.destroy();
  } else {
    msg.channel.send('No.')
  }
};

exports.info = {
  'description': 'DEV LEVEL CMD - Restart the bot',
  'usage': '!restart',
  'permission': ''
}