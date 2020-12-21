const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");


module.exports = {    
    name: "vote",
    helpname: config["prefix"] + "vote",
    description: "Vote for the server!",
    aliases: ["vote"],
    usage: config["prefix"] + "vote",
    category: config["categories"][2],
    execute(message) {
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .addField("__Vote__", stripIndents`
                **❯ Discord bot list:** [Vote here](https://discordbotlist.com/bots/djoofy)
                `)
            .setTimestamp()
            .setFooter("made by FLODJES#5225")
            if (message.channel.type != "dm" ) {
                const member = message.mentions.members.first() || message.member;
                Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
            };

        message.channel.send(Embed);
    }
  }