exports.run = function(client, msg, args, db) {
var ticket = msg.channel
    if (ticket.name.split("-")[0] == "ticket") {
      msg.channel.send(`Closing Ticket...`)
      ticket.delete();
    } else {
      msg.channel.send(`This isn't a ticket channel!`)
    }
}

exports.info = {
  'description': 'Close the current ticket.',
  'usage': '!close',
  'permission': ''
}