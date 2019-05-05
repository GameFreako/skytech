exports.run = async function(client, msg, args, db, RichEmbed) {
    var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Poll")
    var channel = msg.guild.channels.find(ch => ch.name === "polls");
    await channel.send(embed);
    await channel.fetchMessages({ 'limit': 1}).then(tmsg => {
      var nmsg = tmsg.array()[0]
      nmsg.react('❌')
      nmsg.react('✅')
    });
}

exports.info = {
  'description': 'Create a poll and post it in the poll channel',
  'usage': '!poll Is my name amazing?',
  'permission': ''
}