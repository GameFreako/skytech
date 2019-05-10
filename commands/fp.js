exports.run = function(client, msg, args, db) {
  msg.delete();
  var music = require('../api/music.js')
  var channel = msg.guild.channels.find(ch => ch.type === "voice" && ch.name == "music")
  var song = args.join(" ");
  const YT = require('youtube-node')
  var youtube = new YT();
  youtube.setKey(process.env.GKEY);
  youtube.search(song, 1, function(err, results) {
    if (err) console.log(err)
    var data = JSON.stringify(err)
    console.log(data);
    if (data && data !== "null") {
      console.log(`API Response error`)
      var message = data.split(`"message":`)[1].split(`'`)[1]
      var domain = data.split(`"domain":`)[1].split(`'`)[1]
      var reason = data.split(`"reason":`)[1].split(`'`)[1]
      var code = data.split(`"code":`)[1].split(`,`)[1]
      msg.channel.send(`Code ${code} : Reason ${reason} : Domain ${domain} : Message ${message}`);
      return;
    }
    if (!results) {
      msg.channel.send(`Failed to find anything.`)
      console.log(`Did not find song`)
      return;
    }
    console.log(JSON.stringify(results));
    var title = JSON.stringify(results).split(`"title":`)[1].split(`"`)[1].replace(/&quot;/g, ``)
    console.log(`playing ${title}`)
    music.addQueue(db, title)
    music.play(title, msg, channel, false, client, db);
});
}

exports.info = {
  'description': 'undefined',
  'usage': '!fp',
  'permission': 'ADMINISTRATOR'
}