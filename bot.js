require('http').createServer().listen(3000)

console.log("Conectando...");
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client()
client.prefix = config.prefix;

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        return message.reply(`Olá! Você descobriu uma coisa secreta...`)
    }
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    try {
        let commandFile = require(`./modules/${command}.js`);
        delete require.cache[require.resolve(`./modules/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) {
        console.log("-");
        console.error("Erro ao tentar executar este comando: " + err)
        console.log("-");
        let gEmbed = new Discord.RichEmbed()
            .setTitle(":x: | **Erro**")
            .addField(":question: | Comando", "Este comando não existe ou pode estar ocorrendo um erro no comando!")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
            .setColor("FFC0CB").setTimestamp()
        return message.reply(gEmbed)
    }
})

client.on("ready", () => {
    client.user.setGame('Wooaah!... Que soninho bom :3')
    console.log(`Bot inicializado com sucesso! Com ${client.users.size} usuários, em ${client.guilds.size} servidores!`);

    setInterval(async () => {
        let textList = [`${client.guilds.size} Servidores`, `Versão 1.0.2.1`, `Eu estou programando o meu Criador...`, `Tô com fome ;-;`, "Eu amo cuscuz com ovo ♥️"]
        var text = textList[Math.floor(Math.random() * textList.length)];
        client.user.setActivity(text, {
            type: 'STREAMING'
        })
    }, 25000)
});

client.on("guildCreate", guild => {
    let gEmbed_Comandos = new Discord.RichEmbed()
        .setTitle(":page_with_curl: | Comandos")
        .addField(":hammer: | BAN", "Banir algum delinquente do seu servidor")
        .addField(":hammer: | KICK", "Expulsar um membro do seu servidor")
        .addField(":eye: | CLEAR", "Para fazer faxina de mensagens em um determinado canal de texto")
        .addField(":interrobang: | Outros", "Meus outros comandos são `ping` e `uptime`, use algum deles e veja uma mágica acontecer :3")
        .setFooter("BETA")
        .setColor("FFC0CB")
    guild.owner.send(gEmbed_Comandos)

    let gEmbed = new Discord.RichEmbed()
        .setTitle(":door: | **Lorrany**")
        .addField(":door: | Olá", "Obrigada por me adicionar nesse servidor maravilhoso! Me sinto especial, pois eu ainda sou muito nova no Discord :heart:")
        .addField(":page_with_curl: | Comandos", "Meus comandos são bem simples de usar, veja os meus comandos no Discord Bots")
        .setColor("FFC0CB")
    guild.systemChannel.send(gEmbed)

    console.log("-");
    console.log(`Me adicionaram no servidor: ${guild.name} (id: ${guild.id}). Existe ${guild.memberCount} membros nesse servidor!`);
    console.log("-");
});

client.on("guildDelete", guild => {
    let gEmbed = new Discord.RichEmbed()
        .setTitle(":door: | Remoção")
        .addField(":sleepy: | Saída", "Aaaaah... Por que me removeu do seu servidor? Caso tenha encontrado algum instabilidade ou um bug em mim, por favor, contate o meu Desenvolvedor!")
        .addField(":keyboard: | Desenvolvedor", "RxvngePI.js#0022")
        .setColor("FFC0CB")
    guild.owner.send(gEmbed)

    console.log("-");
    console.log(`Fui removida do Servidor: ${guild.name} (id: ${guild.id})`);
    console.log("-");
});

client.login(config.token)
