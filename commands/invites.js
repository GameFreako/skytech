exports.run = function(client, msg, args, db, RichEmbed) {
  msg.guild.fetchInvites().then(invites => {
  var il = invites.array()
  var total = 0
  var i;
  for (i=0;i<il.length;i++) {
    var invite = il[i]; // Good job. Note: The computer doesn't read any text with a // in front of it. Basically any text that's gray and italic.
    if (invite.inviter == msg.author) { // Good job. This makes sure the invite creator is the message author.
      total=total+invite.uses
    }
  }
  var embed = new RichEmbed;
  embed.setTitle('Invites');
  embed.setDescription('You have invited ' + total + ' Users to the discord server.')
  embed.setColor(0x000000)
  msg.channel.send(embed);
  });
} // You should be done now! 

exports.info = {
  'description': 'Show how many users you have invited.',
  'usage': '!invites',
  'permission': ''
}
