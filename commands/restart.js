exports.run = function(client, msg, args, db) {
  var config = require('../config.json')
  if (msg.author.username === "ThatOtherPerson" || msg.author.username === "Cryptic") {
    client.destroy();
  } else {
    msg.channel.send('YO AIN"T MY MOM!')
  }
};

exports.info = {
  'description': 'DEV LEVEL CMD - Restart the bot',
  'usage': '!restart',
  'permission': ''
}