const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, categories, config } = require("../config.json");
const client = new Discord.Client();

module.exports = {    
    name: "help",
    description: "Show the help command",
    aliases: ["help"],
    usage: prefix + "help [command]",
    category: categories[0],
    execute(message, args) {
        const data = [];
		const { commands } = message.client;
        const member = message.mentions.members.first() || message.member;
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .attachFiles(["./files/icon.gif"])
            .setDescription(`**__Djoofy's help command__**: \nsend **\`${this.usage}\`** to get info on a specific command`)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .setThumbnail("attachment://icon.gif")
            .setTimestamp()
            .setFooter("Made by FLODJES#5225")

            categories.forEach(cat => {
				const value = []
				commands.forEach(com => {
					if (com.category == cat) {
						value.push(`❯ **${prefix}${com.name}:** ${com.description} \`[${com.aliases}]\``);
					}
				});
				if (value.length != 0) {
					Embed.addField("__" + cat + "__", value);
				}
            });
        const Embed2 = new Discord.MessageEmbed()

        .addField("__Extra__", stripIndents`
        ❯ [**Invite**](https://discord.com/api/oauth2/authorize?client_id=780154878395547670&permissions=8&scope=bot)
        ❯ [**Vote**](https://discordbotlist.com/bots/djoofy)
            `);
        message.channel.send(Embed);
    }
  }