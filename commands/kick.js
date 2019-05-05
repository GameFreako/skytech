exports.run = function(client, msg, args, db) {
  var user = msg.mentions.users.first();
  var member = msg.guild.member(user);
  var reason = args.join(" ").replace(/@${user.id}/g, ``);
  var ar = msg.member.highestRole.position
  var mr = member.highestRole.position
  if (!ar) ar = 0
  if (!mr) mr = 0
  if (ar > mr) {
    msg.channel.send(`:white_check_mark: Kicked ${member.displayName} for ${reason}`);
    member.kick(reason).catch();
  } else {
    msg.channel.send(`:x: Your role is not high enough to kick ${member.displayName}`)
  }
}

exports.info = {
  'description': 'Kick a member',
  'usage': '!kick @RuleBreaker Breaking the rules!',
  'permission': 'KICK_MEMBERS'
}