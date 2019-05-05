exports.run = async function(client, msg, args, db) {
    msg.delete();
    var music = require('../api/music.js')
    var channel = msg.guild.channels.find(ch => ch.type === "voice" && ch.name == "music")
    var song = args.join(" ");
    finishSetup(music, channel, song, db, client, msg)
} // <------------ REMOVE IF TRANSFER TO OLD SYSTEM
    /* DO NOT TOUCH
    var id = info.split(`;;`)[3]
    var title = info.split(`;;`)[0]
    var description = info.split(``)[1]
    var thumbnail = info.split(``)[2]
    if (queue === "[]") {
      console.log('adding to queue and searching...')
      music.addQueue(db, title, description, thumbnail, id)
      music.play(title, msg, channel, false, client, db);
    } else {
      console.log('adding to queue')
      music.addQueue(db, title, description, thumbnail, id)
    }//ok. How long will it take and are you following my guide on how it should work?
};*/ // the music file is a API - meaning other files ask it to do stuff.
// So if I want to add the queue, I add the stuff in play.js to tell api/music to do stuff for it.
// Anyways I finished the queue framework. I still have to make it PLAY songs from the queue. So is !restart an insta restart?
async function finishSetup(music, channel, song, db, client, msg) {
  const YT = require('youtube-node')
  var youtube = new YT();
  youtube.setKey(process.env.GKEY);
  youtube.search(song, 1, function(err, results) {
    if (err) console.log(err)
    var data = JSON.stringify(err)
    console.log(data);
    if (data && data !== "null") {
      var message = data.split(`"message":`)[1].split(`'`)[1]
      var domain = data.split(`"domain":`)[1].split(`'`)[1]
      var reason = data.split(`"reason":`)[1].split(`'`)[1]
      var code = data.split(`"code":`)[1].split(`,`)[1]
      msg.channel.send(`Code ${code} : Reason ${reason} : Domain ${domain} : Message ${message}`);
      return;
    }
    if (!results) {
      msg.channel.send(`Failed to find anything.`)
      return;
    }
    console.log(JSON.stringify(results));
    var title = JSON.stringify(results).split(`"title":`)[1].split(`"`)[1].replace(/&quot;/g, ``)
  db.all(`SELECT * FROM queue`, function(err, rows) {
    if (err) throw err;
    if (rows) {
      console.log(rows + ' - ' + JSON.stringify(rows));
    if (JSON.stringify(rows) === "[]") {
      console.log('adding to queue and searching...')
      music.addQueue(db, title)
      music.play(title, msg, channel, false, client, db);
    } else {
      console.log('adding to queue')
      music.addQueue(db, title)
      msg.channel.send(`Added to queue.`)
    }
    }
  });
});
}

exports.info = {
  'description': 'Play music / Add music to the queue',
  'usage': '!play Mercy or Genocide',
  'permission': ''
}