exports.run = async function(client, msg, args, db, RichEmbed) {
  db.all(`SELECT * FROM balance WHERE user="${msg.author.id}"`, async function(err, rows) {
    if (err) throw err;
    console.log(rows);
    if (JSON.stringify(rows) !== "[]") {
      msg.channel.send(`Your balance is $${rows[0].balance}`);
    } else {
      var lmsg = await msg.channel.send(':x: Please wait whilst your balance is setup...');
      db.run(`INSERT INTO balance ('user', 'balance') VALUES ("${msg.author.id}", "250")`);
      lmsg.edit(':white_check_mark: Your balance has been setup. Please execute the command again.')
    }
  });
}

exports.info = {
  'description': 'Display your current balance',
  'usage': '!balance',
  'permission': ''
}