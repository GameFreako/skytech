exports.run = function(client, msg, args, db, RichEmbed) {
  var rr = msg.guild.roles.find(ro => ro.name === "Unverified")
  var ar = msg.guild.roles.find(ro => ro.name === "[Member]")
  if (!ar) return;
  if (!rr) return;
  msg.member.addRole(ar);
  msg.member.removeRole(rr);
};
