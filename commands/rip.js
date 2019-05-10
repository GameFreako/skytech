exports.run = async function(client, msg, args, db, RichEmbed, config) {
  const Jimp = require('jimp')
  let avatarurl = msg.mentions[0] ? msg.mentions[0].avatarURL : msg.author.avatarURL

	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}
	const avatar = await Jimp.read(avatarurl)
	const bat = await Jimp.read('./assets/rip.png')

	avatar.resize(300, 300)
	bat.resize(642, 806)
	bat.composite(avatar, 175, 385)
	bat.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await msg.channel.send('', { file: buffer, name: 'rip.png' })
		} catch (e) {
			console.log(e)
			await msg.channel.send(`:x: An error has occoured.`)
		}
	})
}

exports.info = {
  'description': 'RIP',
  'usage': '!rip',
  'permission': ''
}