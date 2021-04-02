const Discord = require('discord.js')
const userID = '<@600454770003673088>'

module.exports.run = async (client, message, args) => {
    if(message.author === userID && !message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(":interrobang: | Voc� n�o tem permiss�o para executar esse comando!")
    let member = message.mentions.members.first()
    if(!member)
      return message.channel.send(":interrobang: | Mencione um **Usu�rio** existente para que eu possa expulsar!")
    if(!member.kickable)
      return message.channel.send(":thinking: | Eu n�o posso expulsar esse **Usu�rio**, tente me colocar no mais alto da hierarquia desse servidor ou o meu acima do dele")
    let reason = args.slice(1).join(' ')
    if(!reason) reason = "Nenhuma raz�o foi fornecida"
    await member.kick(reason)
      .catch(error => message.channel.send(`Desculpe ${message.author}, não consegui banir o membro devido o: ${error}, envie esse erro para o meu desenvolvedor para que ele possa lhe ajudar ou corrigir o erro`))

      let pEmbed = new Discord.RichEmbed()
          .setTitle(":hammer: | **Expuls�o**")
          .addField(":thinking: | Expulso: ", `${member.user.tag}`)
          .addField(":oncoming_police_car: | Por: ", `${message.author.tag}`)
          .addField(":exclamation: | Motivo: ", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          .setColor("FFC0CB").setTimestamp()

          message.channel.send(pEmbed)
          
}

module.exports.help = {
    name: "kick"
}