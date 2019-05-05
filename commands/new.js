exports.run = function(client, msg, args, db, RichEmbed) {
var ticketid = msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]").children.array().length+1;
    console.log(ticketid + ' ' + msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]").children.array());
    msg.guild.createChannel(`Ticket-${ticketid}`, `text`).then(channel => {
      channel.overwritePermissions(msg.member, `{ 'READ_MESSAGES': true}`, `[CREATE TICKET]`);
      channel.setParent(msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]"));
      var embed = new RichEmbed;
      embed.setAuthor(msg.member.displayName, msg.author.avatarURL)
      embed.setTimestamp();
      embed.setDescription(`Hey, <@${msg.member.id}>. One of our <@&${msg.guild.roles.find(r => r.name === "[Support]").id}> staff will be here shortly to assist you. Please describe your problem below.`)
      channel.send(embed);
      msg.channel.send(`:white_check_mark: Opened ticket ${ticketid} in channel <#${channel.id}>`)
    });
};

exports.info = {
  'description': 'Create a new ticket',
  'usage': '!new',
  'permission': ''
}