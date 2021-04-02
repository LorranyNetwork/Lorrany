const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    let pEmbed = new Discord.RichEmbed()
        .setTitle(":ping_pong: | **Pong**")
        .addField(":robot: | BOT: ", Math.floor(client.ping) + "ms")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setColor("FFC0CB")
        message.channel.send(pEmbed)
}

module.exports.help = {
    name: "ping"
}