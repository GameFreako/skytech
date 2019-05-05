exports.run = function(client, msg, args, db, RichEmbed) {
      var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Announcement")
    if (!msg.member.hasPermission("MENTION_EVERYONE", false, true, true)) {
      msg.channel.send(`To send a announcement, you require MENTION_EVERYONE permission.`)
      return;
    }
  msg.guild.channels.find(ch => ch.name === "news").send(embed);
};

exports.info = {
  'description': 'Make a announcement and post it in the news channel.',
  'usage': '!announce Hello World!',
  'permission': 'MENTION_EVERYONE'
}