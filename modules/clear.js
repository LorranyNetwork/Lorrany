const Discord = require('discord.js')
const userID = '<@600454770003673088>'

exports.run = async (client, message, args, prefix) => {

    let user = message.mentions.users.first()
    let reason = args[0]
    if (message.author === userID && !message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Já parou para pensar que você não tem permissão para executar esse comando? Você necessita da permissão `Gerenciar mensagens` para poder usar este comando")
    if (message.author === userID && !message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Que estranho... Não posso atender o seu pedido por conta que eu não tenho permissão. Eu necessito da permissão `Gerenciar mensagens`!")
    if (!reason) return message.channel.send(":interrobang: | É necessário colocar um numero de 1 a 100")
    if (isNaN(reason)) return message.channel.send(":interrobang: | É necessário colocar um numero de 1 a 100")
    if (reason < 1) return message.channel.send(":interrobang: | Esse numero é muito baixo!")
    if (reason > 100) return message.channel.send(":interrobang: | Esse número é acima de 100...")

    message.delete()
    let massagem = "";
    let viagem = "";

    message.channel.fetchMessages({
        limit: reason,
    }).then((messages) => {
        if (!user) {
            massagem = messages.filter(m => m.author.id).array().slice(0, reason)
            viagem = massagem.filter(a => a.pinned === false)
        }
        message.channel.bulkDelete(viagem).catch(error => console.log(error.stack))

        let pEmbed = new Discord.RichEmbed()
            .setTitle(":envelope: | **Faxina**")
            .addField(":oncoming_police_car: | Por: ", `${message.author.tag}`)
            .setColor("FFC0CB")

        message.channel.send(pEmbed)
    })
}

module.exports.help = {
    name: "clear"
}