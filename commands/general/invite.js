const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");


module.exports = {    
    name: "invite",
    description: "Invite the bot to your server!",
    aliases: ["invite"],
    usage: config["prefix"] + "invite",
    category: config["categories"][1],
    execute(message) {

        const member = message.mentions.members.first() || message.member;
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__Invite__", stripIndents`
                **❯ Invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=780154878395547670&permissions=8&scope=bot)**
                `)
            .setTimestamp()
            .setFooter("made by FLODJES#5225");

        message.channel.send(Embed);
    }
  }