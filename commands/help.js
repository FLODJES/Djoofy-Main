const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, categories, config } = require("../config.json");
const client = new Discord.Client();

module.exports = {    
    name: "help",
    description: "List all commands or give information (name, description, aliases,...) of a specific command",
    aliases: ["help"],
    usage: prefix + "help [command]",
    category: categories[0],
    execute(message, args) {
        const data = [];
		const { commands } = message.client;
        const member = message.mentions.members.first() || message.member;
        
        if (!args.length) {
			// inside a command, event listener, etc.
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
                return message.channel.send(Embed);
            } else {
                const name = args[0].toLowerCase();
                const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    
                if (!command) {
                    return message.reply("That's not a valid command!");
                }
    
                let aliases = "None";
                if (command.aliases) {
                    aliases = command.aliases.join(", ");
                }
    
                const Embed = new Discord.MessageEmbed()
                    .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                    .setTitle("Extra command info.")
                    .setDescription(prefix + command.name + ":")
                    .addFields(
                        { name: "**__Description__**", value: command.description },
                        { name: "**__Aliases__**", value: "`[" + aliases + "]`", inline: true },
                    )
                    .setTimestamp()
                    .setFooter("Made by FLODJES#5225")    
    
                message.channel.send(Embed);
            }
        },
    }
