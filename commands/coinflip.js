exports.run = function(client, msg, args, db) {
  var min = 0
  var max = 1
  var num = Math.round(Math.random);
  if (num == 0) var type = 'tails'
  if (!type) var type = 'heads'
  var img = `./assets/${type}.png`
}

exports.info = {
  'description': 'Flip a coin',
  'usage': '!coinflip',
  'permission': ''
}