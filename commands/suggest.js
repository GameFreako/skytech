exports.run = async function(client, msg, args, db, RichEmbed) {
var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Suggestion")
    var channel = msg.guild.channels.find(ch => ch.name === "suggestions");
    await channel.send(embed);
    await channel.fetchMessages({ 'limit': 1}).then(tmsg => {
      var nmsg = tmsg.array()[0]
      nmsg.react('❌')
      nmsg.react('✅')
    });
}

exports.info = {
  'description': 'Make a suggestion and post it in the suggestions channel.',
  'usage': '!suggest MORE FEATURES!',
  'permission': ''
}