const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix, owner } = require("../config.json");
const client = new Discord.Client();

module.exports = {    
    name: "help",
    description: "Show the help command;",
    aliases: ["help", `<@!${client.userID}>`],
    usage: "help",
    execute(message) {

        const member = message.mentions.members.first() || message.member;
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__General__", stripIndents`
                **❯ ${prefix}whois:** Shows the "who is" from a user. [${prefix}whois, ${prefix}userinfo]
                **❯ ${prefix}serverinfo:**  Shows the server info. [${prefix}serverinfo, ${prefix}server]
                **❯ ${prefix}botinfo:**  Shows the bot. [${prefix}botinfo, ${prefix}bot]

                `)
            .addField("__Extra__", stripIndents`
                **❯ ${prefix}vote:** Get a cookie :cookie: irl! (**no scam, i swear**)
                `)
            .setTimestamp()
            .setFooter("made by FLODJES#5225");

        message.channel.send(Embed);
    }
  }