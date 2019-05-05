exports.run = function(client, msg, args, db, RichEmbed, config) {
msg.delete();
    if (msg.author.id == config.dev) {
      var code = args.join(" ");
      eval(code);
    }
};

exports.info = {
  'description': 'DEV LEVEL CMD - Execute code in the discord.js enviorment',
  'usage': '!eval msg.channel.send("Hi!")',
  'permission': ''
}