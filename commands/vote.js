const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, owner } = require("../config.json");


module.exports = {    
    name: "vote",
    description: "Vote to get a cookie",
    aliases: ["vote"],
    usage: "vote",
    execute(message) {

        const member = message.mentions.members.first() || message.member;
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__Vote__", stripIndents`
                **❯ Discord bot list:** [Vote here](https://discordbotlist.com/bots/djoofy)
                `)
            .setTimestamp()
            .setFooter("made by FLODJES#5225");

        message.channel.send(Embed);
    }
  }