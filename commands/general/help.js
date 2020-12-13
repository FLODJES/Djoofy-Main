const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, categories, config } = require("../../config.json");
const client = new Discord.Client();

module.exports = {    
    name: "help",
    helpname: prefix + "help",
    description: "List all commands or give information (name, description, aliases,...) of a specific command",
    aliases: ["help"],
    usage: prefix + "help [command]",
    category: categories[1],
    execute(message, args) {
        const data = [];
		const { commands } = message.client;
        
        if (message.channel.type != "dm" ) {
            const member = message.mentions.members.first() || message.author || message.member;
        };
       
        
        if (!args.length) {
			// inside a command, event listener, etc.
            // Create embed
            const Embed = new Discord.MessageEmbed()
                .attachFiles(["./files/icon.gif"])
                .setDescription(`**__Djoofy's help command__**: \nsend **\`${this.usage}\`** to get info on a specific command`)
                .setThumbnail("attachment://icon.gif")
                .addField("Support the bot" , 
                    "[Vote here](https://top.gg/bot/780154878395547670/vote) • [Support server](https://discord.gg/cX2xjmZFgZ) • [Invite](https://discord.com/api/oauth2/authorize?client_id=780154878395547670&permissions=8&scope=bot)") 
                .setTimestamp()
                .setFooter("Made by FLODJES#5225")
                if (message.channel.type != "dm" ) {
                    const member = message.mentions.members.first() || message.member;
                    Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                };
                

                categories.forEach(cat => {
                    const value = []
                    commands.forEach(com => {
                        if (com.category == cat) {
                            value.push(`❯ **${com.helpname}:** ${com.description} \`[${com.aliases}]\``);
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
                    .setTitle("Extra command info.")
                    .setDescription(prefix + command.name + ":")
                    .addFields(
                        { name: "**__Description__**", value: command.description },
                        { name: "**__Aliases__**", value: "`[" + aliases + "]`", inline: true },
                    )
                    .setTimestamp()
                    .setFooter("Made by FLODJES#5225")
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    }; 
    
                message.channel.send(Embed);
            }
        },
    }
