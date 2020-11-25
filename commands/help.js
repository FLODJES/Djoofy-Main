const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, owner } = require("../config.json");


module.exports = {    
    name: "help",
    description: "Show the help command;",
    aliases: ["help"],
    usage: "help",
    execute(message) {

        const member = message.mentions.members.first() || message.member;
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__General__", stripIndents`
                **❯ ${prefix}whois:** Shows the "who is" from a user. [${prefix}whois, ${prefix}userinfo]
                **❯ ${prefix}serverinfo:**  Shows the server info. [${prefix}serverinfo, ${prefix}server]
                `, true)
            .setTimestamp()
            .setFooter("made by FLODJES#5225");

        message.channel.send(Embed);
    }
  }