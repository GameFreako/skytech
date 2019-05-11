exports.run = function(client, msg, args, db, RichEmbed) {
  msg.channel.fetchMessages({ 'limit': args[0] }).then(MD => {
    var messages = MD.array();
    var i;
    var deleted = 0
    for (i=0;i<messages.length;i++) {
      var message = messages[i]
      if (message.deleteable) {
        message.delete()
        deleted++
      }
    }
    msg.channel.send(`Deleted ${deleted}/${args[0]} messages.`)
  });
};

exports.info = {
  'description': 'Removes messages from the chat.',
  'usage': '!clearchat <amount>',
  'permission': 'MANAGE_MESSAGES'
};
