exports.run = function(client, msg, args, db, RichEmbed) {
  var min = 0
  var max = 1
  var num = Math.round(Math.random());
  if (num == 0) var type = 'Tails'
  if (!type) var type = 'Heads'
  var img = `assets/${type}.png`
  var embed = new RichEmbed
  embed.setTitle('Coinflip')
  embed.setAuthor(msg.member.displayName, msg.author.avatarURL)
  embed.setDescription(`${type}!`)
  embed.setThumbnail(`https://skytech.glitch.me/file?dir=${img}`)
  embed.setTimestamp();
  embed.setColor(0x000000)
  msg.channel.send(embed);
}

exports.info = {
  'description': 'Flip a coin',
  'usage': '!coinflip',
  'permission': ''
}