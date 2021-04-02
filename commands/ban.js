const Discord = require('discord.js')
const userID = '<@600454770003673088>'

module.exports.run = async (client, message, args) => {
    if(message.author === userID && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("Você não tem permissão para executar esse comando!")
    let member = message.mentions.members.first()
    if(!member)
      return message.channel.send(":thinking: | Mencione um **Usuário** existente para que eu possa banir...")
    if(!member.bannable)
      return message.channel.send(":slight_frown: | Eu não posso banir esse **Usuário**, tente me colocar no mais alto da hierarquia desse servidor ou o meu cargo acima do dele")
    let reason = args.slice(1).join(' ')
    if(!reason) reason = "Nenhuma razão foi fornecida"
    await member.ban(reason)
      .catch(error => message.channel.send(`Desculpe ${message.author}, não consegui banir o membro devido o: ${error}, envie esse erro para o meu desenvolvedor para que ele possa lhe ajudar ou corrigir o erro`))

      let pEmbed = new Discord.RichEmbed()
          .setTitle(":hammer: | **BAN**")
          .addField(":thinking: | Banido: ", `${member.user.tag}`)
          .addField(":oncoming_police_car: | Por: ", `${message.author.tag}`)
          .addField(":exclamation: | Motivo: ", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          .setColor("FFC0CB").setTimestamp()

          message.channel.send(pEmbed)
          
}

module.exports.help = {
    name: "ban"
}