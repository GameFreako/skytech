exports.run = function(client, msg, args, db, RichEmbed) { // 🗑 UNICODE DELETE ICON 🗑 DO NOT REMOVE 🗑
  var embed = new RichEmbed;
  embed.setTitle(`Command List`)
  embed.setDescription(`Please click on the garbage icon at the bottom of the message to delete the message.`)
  embed.setColor(0x000000)
  const fs = require('fs')
  fs.readdir('./commands', async function(err, files) {
    var i;
    for (i=0;i<files.length;i++) {
      var command = require(`../commands/${files[i]}`).info
      embed.addField(command.usage, command.description, false)
    }
    await msg.channel.send(embed);
     msg.channel.fetchMessages(1).then(lastmsg => {
       var lmsg = lastmsg.array()[0]
    lmsg.react('🗑')
    const filter = (reaction, user) => reaction.emoji.name === "🗑" && user.id === msg.author.id;
    const collector = lmsg.createReactionCollector(filter);
    collector.on('collect', r => lmsg.delete());
    });
  });
}

exports.info = {
  'description': 'This Command',
  'usage': '!help',
  'permission': ''
}