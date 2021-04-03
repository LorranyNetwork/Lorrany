const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        let sEmbed = new Discord.RichEmbed()
            .setTitle(":x: | **Erro**")
            .addField(":question: | Permissão", "Desculpe, mas você não tem permissão para usar este comando!")
            .addField(":orange_book: | Qual Permissão", "A permissão que está faltando para você usar este comando é a de **Administrador**!")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
            .setColor("FF0000").setTimestamp()

        return message.reply(sEmbed);
    }

    message.delete()
    try {
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = client.users.get(args[0]);
        }

        let botmessage = args.slice(1).join(' ')

        if (args[0] == null) {
            let aEmbed0 = new Discord.RichEmbed()
                .setTitle(":x: | **Erro**")
                .addField(":question: | Usuário sem Identificação", "Mencione um usuário ou um bot (Como eu) válido!")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
                .setColor("FF0000")
                .setTimestamp()

            return message.channel.send(aEmbed0)
        }

        if (args[1] == null) {
            let aEmbed1 = new Discord.RichEmbed()
                .setTitle(":x: | **Erro**")
                .addField(":question: | Mensagem Vazia", "Não posso criar um **Webhook** com uma mensagem vazia...")
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
                .setColor("FF0000").setTimestamp()

            return message.channel.send(aEmbed1)
        }

        message.channel.createWebhook(user.username, user.avatarURL).then(w => {
            w.send(botmessage);
            w.delete();
        })
    } catch (err) {
        let eEmbed = new Discord.RichEmbed()
            .setTitle(":x: | **Erro**")
            .addField(":question: | Falha ao executar o Comando", "Não consegui criar um **Webhook** por falta de permissão ou pelo motivo que o usuário mencionado não existe!")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
            .setColor("FF0000")
            .setTimestamp()

        message.reply(eEmbed)
    }
}