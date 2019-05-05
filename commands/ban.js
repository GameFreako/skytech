exports.run = function(client, msg, args, db) {
  var user = msg.mentions.users.first();
  var member = msg.guild.member(user);
  var reason = args.join(" ").replace(/@${user.id}/g, ``);
  var ar = msg.member.highestRole.position
  var mr = member.highestRole.position
  if (!ar) ar = 0
  if (!mr) mr = 0
  if (ar > mr) {
    msg.channel.send(`:white_check_mark: Banned ${member.displayName} for ${reason}`);
    member.kick(reason).catch();
  } else {
    msg.channel.send(`:x: Your role is not high enough to ban ${member.displayName}`)
  }
}

exports.info = {
  'description': 'BAN a member',
  'usage': '!ban @RuleBreaker Breaking the rules!',
  'permission': 'BAN_MEMBERS'
}