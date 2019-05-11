exports.run = function(client, msg, args, db, RichEmbed) {
  var role = msg.guild.roles.find(ro => ro.name === "Verified")
  if (!role) {
    msg.channel.send("ERR404:NotFound")
    msg.channel.send("[ERROR] An error has been detected. Please contact the developer to resolve this issue.")
    msg.channel.send("404:NOTFOUND_ROLE-Verified")
    return;
  } else {
    msg.channel.send('Account Verified.')
  }
};
