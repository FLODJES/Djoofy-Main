const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const fs = require("fs");
decode64 = require("base-64").decode;


module.exports = {    
    name: "cape",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "cape",
    description: "Get the cape from a Java player.",
    aliases: ["cape", "c"],
    usage: config["prefix"] + "cape [username]",
    category: config["categories"][0],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then((response) => {
            console.log(response);

                // Create embed
                const Embed = new Discord.MessageEmbed()
                    .setTitle("Player Cape")
                    .addField("**__Username__**", "❯ `" + response.username + "`")
                    .setImage(response.cape)
                    .setFooter("Made by FLODJES#5225")
                    .setTimestamp();
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(Embed);
        })



    },
}; 