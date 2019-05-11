const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const YT = require('youtube-node');
const youtube = new YT()
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Youtube Functions

// Set API Key
youtube.setKey(process.env.GKEY);

/* function ytsearch(query) {
  youtube.search(query, 1, function(err, res) {
    if (err) throw err;
    console.log('RES ' + res);
    var items = JSON.parse(res).items
    console.log('ITEMS ' + items)
    var data = JSON.parse(items).snippet
    console.log('DATA ' + data)
    var title = data.title
    var description = data.title
    var thumbnail = data.thumbnails.default.url
    var author = data.channelTitle
    var di = JSON.parse(items[0]).id
    var id = di.videoId
    var returnJSON = `{'title': '${title}', 'desc': '${description}', 'thumbnail': '${thumbnail}', 'author': '${author}', 'id': '${id}' }`
    return returnJSON;
  });
}; */

app.get('/file', function(req, res) {
  var file = req.query.dir
  if (file) {
    res.sendFile(__dirname + '/' + file)
  }
});

function ytsearch(query, msg, channel, loop) {
  youtube.search(query, 1, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    var datastring = JSON.stringify(result, null, 1);
    var id = datastring.split(`"videoId":`)[1].split(`"`)[1]
    var title = datastring.split(`"title":`)[1].split(`"`)[1]
    var desc = datastring.split(`"description":`)[1].split(`"`)[1]
    var thumbnail = datastring.split(`"url":`)[3].split(`"`)[1]
    var returnMSG = `${id};;${title};;${desc};;${thumbnail}`
    resumePlay(msg, channel, returnMSG, loop);
  }
});
};

function resumePlay(msg, channel, data, loop) {
  var id = data.split(';;')[0]
  var title = data.split(';;')[1]
  var description = data.split(';;')[2]
  var thumbnail = data.split(';;')[3]
  var embed = new RichEmbed;
  embed.setTitle(title)
  embed.setDescription(description)
  embed.setThumbnail(thumbnail)
  client.user.setActivity(title, { 'type': 'LISTENING' })
  msg.channel.send(embed)
  var stream = ytdl(`https://youtube.com/watch?v=${id}`)
  channel.join().then(vc => {
    var dispatch = vc.playStream(stream);
    dispatch.on('end', reason => {
      console.log(`Stream ended due to ${reason}`)
      if (loop) {
      dispatch = vc.playStream(stream)
      } else {
        vc.channel.leave();
        client.user.setActivity('Silence', { 'type': 'LISTENING' })
      }
    });
  });
};


// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);



var config = require(`./config.json`)
var prefix = config.prefix
var token = process.env.TOKEN
var i;
var invuses = []



async function reloadInvites(g) {
  console.log(`[RI] ${g.name}`)
  var i;
  invuses = []
  client.guilds.first().fetchInvites().then(il => {
    var invites = il.array();
    for (i=0;i<invites.length;i++) {
      var invite = invites[i];
      invuses[invite.code] = invite.uses
    }
  });
};



client.on(`ready`, () => {
  console.log(`[BOOT]`)
  client.user.setActivity(`Silence`, { 'type': `LISTENING` })
  db.run(`DELETE FROM queue`)
  reloadInvites(client.guilds.first());
});

client.on('message', msg => {
  console.log(`[${msg.channel.name}] ${msg.member.displayName}: ${msg.content}`)
  var args = msg.content.slice(prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase()
  console.log(cmd + '  -  ' + args)
  try {
    var command = require(`./commands/${cmd}.js`)
    var requiredPermission = command.info.permission
    if (requiredPermission) {
      if (msg.member.hasPermission(requiredPermission, false, true, true)) {
        console.log(`Ran CMD ${cmd} with args ${args}`)
        command.run(client, msg, args, db, RichEmbed, config)
      } else {
        msg.channel.send(`:x: You do not have permission to perform this command.`);
        return;
      }
    } else {
      command.run(client, msg, args, db, RichEmbed, config);
      console.log(`Ran CMD ${cmd} with args ${args}`)
    }
  } catch(err) {
    if (msg.author.bot) return;
    if (err === `Error: Cannot find module './commands/${cmd}.js'`) return;
    console.error(`Error when attempting to run ${cmd} with error ${err}`)
  }
});


// Old Command System
/* client.on('message', async msg => {
  var args = msg.content.slice(prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase()
  if (msg.author.bot) return;
  if (cmd === "suggest") {
    var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Suggestion")
    var channel = msg.guild.channels.find(ch => ch.name === "suggestions");
    await channel.send(embed);
    await channel.fetchMessages({ 'limit': 1}).then(tmsg => {
      var nmsg = tmsg.array()[0]
      nmsg.react('❌')
      nmsg.react('✅')
    });
  } else if (cmd === "poll") {
    var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Poll")
    var channel = msg.guild.channels.find(ch => ch.name === "polls");
    await channel.send(embed);
    await channel.fetchMessages({ 'limit': 1}).then(tmsg => {
      var nmsg = tmsg.array()[0]
      nmsg.react('❌')
      nmsg.react('✅')
    });
  } else if (cmd === "announce") {
    var suggestion = args.join(" ");
    var embed = new RichEmbed
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(suggestion)
    embed.setColor(0x000000);
    embed.setTitle("Announcement")
    if (!msg.member.hasPermission("MENTION_EVERYONE", false, true, true)) {
      msg.channel.send(`To send a announcement, you require MENTION_EVERYONE permission.`)
      return;
    }
    var channel = msg.guild.channels.find(ch => ch.name === "news");
    await channel.send(embed);
  } else if (cmd == "eval") {
    msg.delete();
    if (msg.author.id == config.dev) {
      var code = args.join(" ");
      eval(code);
    }
  } else if (cmd === "play") {
    var channel = msg.guild.channels.find(ch => ch.type === "voice" && ch.name == "music")
    var song = args.join(" ");
    ytsearch(song, msg, channel, false);
  } else if (cmd === "loop") {
    var channel = msg.guild.channels.find(ch => ch.type === "voice" && ch.name == "music")
    var song = args.join(" ");
    ytsearch(song, msg, channel, true);
  } else if (cmd === "stop") {
    if (!msg.member.voiceChannel || msg.member.voiceChannel.name !== "music") {
      msg.channel.send(`You are not listening to the music, so you cannot stop it!`);
      return;
    };
    msg.guild.channels.find(ch => ch.type === "voice" && ch.name == "music").leave();
  } else if (cmd === "new") {
    var ticketid = msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]").children.array().length+1;
    console.log(ticketid + ' ' + msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]").children.array());
    msg.guild.createChannel(`Ticket-${ticketid}`, `text`).then(channel => {
      channel.overwritePermissions(msg.member, `{ 'READ_MESSAGES': true}`, `[CREATE TICKET]`);
      channel.setParent(msg.guild.channels.find(ch => ch.type === "category" && ch.name == "[TICKETS]"));
      var embed = new RichEmbed;
      embed.setAuthor(msg.member.displayName, msg.author.avatarURL)
      embed.setTimestamp();
      embed.setDescription(`Hey, <@${msg.member.id}>. One of our <@&${msg.guild.roles.find(r => r.name === "[Support]").id}> staff will be here shortly to assist you. Please describe your problem below.`)
      channel.send(embed);
    });
  } else if (cmd === "close") {
    var ticket = msg.channel
    if (ticket.name.split("-")[0] == "ticket") {
      msg.channel.send(`Closing Ticket...`)
      ticket.delete();
    } else {
      msg.channel.send(`This isn't a ticket channel!`)
    }
  }
}); */



client.on(`guildMemberAdd`, member => {
  console.log(`[EV GMA]`);
  // Add Default Role
  var g = member.guild
  var r = g.roles.find(r => r.name === config.defaultRole)
  member.addRole(r, `DEFAULT ROLE ADD`);
  // Check Inviter
  g.fetchInvites().then(ivl => {
    var invites = ivl.array();
    for (i=0;i<invites.length;i++) {
      var inv = invites[i]
      var uses = inv.uses
      var cuses = invuses[inv.code]
      if (uses > cuses) {
        client.channels.find(ch => ch.name === "welcome").send(`${member.displayName} joined from ${inv.inviter}'s invite`);
      }
    };
  });
});


if (process.env.DISABLED) {
  client.login(token);
} else {
  console.error(`[WARNING] BOT DISABLED [WARNING]`)
}

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});