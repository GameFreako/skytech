exports.run = function(client, msg, args, db, RichEmbed, config) {
msg.delete();
    if (msg.author.id == config.dev) {
      var code = args.join(" ");
      db.run(code);
    }
};

exports.info = {
  'description': 'DEV LEVEL CMD - Execute code in the database',
  'usage': '!db DELETE FROM queue',
  'permission': ''
}