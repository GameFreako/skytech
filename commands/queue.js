exports.run = function(client, msg, args, db, RichEmbed) {
  db.all(`SELECT * FROM queue`, function(err, rows) {
    if (err) throw err;
    var data = rows;
    console.log(rows)
    console.log(data);
    if (data === "[]") {
      msg.channel.send(`:x: No items are in the queue.`)
    } else {
      var embed = new RichEmbed;
      embed.setTitle(`Queue List`)
      var i;
      for (i=1;i<data.length;i++) {
        var song = data[i]
        console.log(song.title + ' ' + song)
        embed.addField(`Position #${i}`, `${song.title}`, false)
      }
      msg.channel.send(embed);
    }
  });
}

exports.info = {
  'description': 'List all songs in the queue',
  'usage': '!queue',
  'permission': ''
}