exports.play = async function ytsearch(query, msg, channel, loop, client, db) {
  const YT = require('youtube-node');
  const youtube = new YT();
  youtube.setKey(process.env.GKEY)
  youtube.search(query, 1, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    var datastring = JSON.stringify(result, null, 1);
    console.log(datastring);
    var id = datastring.split(`"videoId":`)[1].split(`"`)[1]
    var title = datastring.split(`"title":`)[1].split(`"`)[1]
    var desc = datastring.split(`"description":`)[1].split(`"`)[1]
    var thumbnail = datastring.split(`"url":`)[3].split(`"`)[1]
    var chid = datastring.split(`"channelId":`)[1].split(`"`)[1]
    var returnMSG = `${id};;${title};;${desc};;${thumbnail};;${chid}`
    resumePlay(msg, channel, returnMSG, loop, client, db, youtube);
  }
});
};

async function resumePlay(msg, channel, data, loop, client, db, youtube) {
  const { Client, RichEmbed } = require('discord.js');
  const music = require('../api/music.js')
  const ytdl = require('ytdl-core');
  var id = data.split(';;')[0]
  var title = data.split(';;')[1].replace(/&quot;/g, '')
  var description = data.split(';;')[2]
  var thumbnail = data.split(';;')[3]
  var CHID = data.split(`;;`)[4]
  youtube.getChannelById(CHID, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
  var datastring = JSON.stringify(result);
  var author = datastring.split(`"title":`)[1].split(`"`)[1]
  var chimg = datastring.split(`"url":`)[3].split(`"`)[1]
  var embed = new RichEmbed;
  embed.setAuthor(author, chimg);
  embed.setTitle(title)
  embed.setDescription(description)
  embed.setThumbnail(thumbnail)
  client.user.setActivity(title, { 'type': 'WATCHING' })
  msg.channel.send(embed)
  var stream = ytdl(`https://youtube.com/watch?v=${id}`)
  channel.join().then(vc => {
    var firstDispatch = vc.playArbitraryInput(`https://cdn.glitch.com/d6e87e7b-c75e-4dfc-b54e-536cf1d3a920%2FttsMP3.com_VoiceText_2019-5-4_11_9_5.mp3?1556982593589`, { 'volume': 10, 'bitrate': 'auto' })
    firstDispatch.on('end', () => {
    var dispatch = vc.playStream(stream);
    dispatch.on('end', reason => {
      console.log(`Stream ended due to ${reason}`)
      if (loop) {
//hi    dispatch = vc.playStream(stream) Is not okay.
        dispatch = vc.playStream(stream, { 'volume': 100, 'bitrate': 'auto' }) // This is okay
        // add comments at the end of the line, or on a new line. Otherwise you comment out code. k
      } else {
          var lastDispatch = vc.playArbitraryInput(`https://cdn.glitch.com/d6e87e7b-c75e-4dfc-b54e-536cf1d3a920%2FttsMP3.com_VoiceText_2019-5-4_11_17_4.mp3?1556983042196`, { 'volume' : 10, 'bitrate': 'auto' })
          lastDispatch.on('end', async () => {
            music.delQueue(db, title);
            db.all(`SELECT * FROM queue`, function(err, rows) {
              if (err) throw err;
              if (rows !== "[]") {
                var nextSong = rows[0]
                if (nextSong) {
                var t = nextSong.title.replace(/&quot;/g, ``)
                var cmd = `!fp ${t}`
                console.log(nextSong.title + '   -   ' + JSON.stringify(rows));
                music.delQueue(db, t);
                setTimeout(runCommand, 1000, client, cmd)
                }
              }
              });
            vc.channel.leave();
            client.user.setActivity('Silence', { 'type': 'WATCHING' })
          });
      };
    })});
  })}});
};

function runCommand(client, cmd) {
  client.channels.find(ch => ch.name === "bot-commands").send(cmd)
}

exports.getQueue = function(db) {
  db.all(`SELECT * FROM queue`, function(err, rows) {
    if (err) throw err;
    if (rows) {
      console.log(JSON.stringify(rows));
      return JSON.stringify(rows);
    }
  });
}

exports.addQueue = function(db, title) {
  db.run(`INSERT INTO queue ("title") VALUES ("${title}")`);
  return true;
};

exports.delQueue = function(db, title) {
  console.log(`Deleting ${title} from queue`)
  db.run(`DELETE FROM queue WHERE "title"="${title}"`)
  return true;
};

exports.nextSong = function(db) {
  db.all(`SELECT * FROM queue`, function(err, rows) {
    if (err) throw err;
    if (rows === "[]") return false;
    var nextSong = rows[0]
    return JSON.stringify(nextSong);
  });
};

exports.search = function(q) {
  const YT = require('youtube-node')
  var youtube = new YT();
  youtube.setKey(process.env.GKEY);
  youtube.search(q, 1, function(err, results) {
    if (err) throw err;
    var datastring = JSON.stringify(results);
    var id = datastring.split(`"videoId":`)[1].split(`"`)[1]
    var title = datastring.split(`"title":`)[1].split(`"`)[1]
    var description = datastring.split(`"description":`)[1].split(`"`)[1]
    var thumbnail = datastring.split(`"url":`)[3].split(`"`)[1]
    var returnMSG = `${title};;${description};;${thumbnail};;${id}`
    return returnMSG;
  }); // This isn't what you should do, but PARSING the result doesn't work, so I have to use a in-effecient method.
}// 
                 // I'm mostly just copying what's at the top of the file lol - Eh I already did most of it lol