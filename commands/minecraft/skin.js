const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const fs = require("fs");
decode64 = require("base-64").decode;


module.exports = {    
    name: "skin",
    description: "Get the skin from a Java player.",
    aliases: ["skin", "s"],
    usage: config["prefix"] + "skin [username]",
    category: config["categories"][0],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then((response) => {
            // console.log(response);

                // Create embed
                const Embed = new Discord.MessageEmbed()
                    .setTitle("Player skin")
                    .addField("**__Username__**", "❯ `" + response.username + "`")
                    .addField("**__Apply skin__**", "❯ [Click here](https://www.minecraft.net/en-us/profile/skin/remote%3Furl%3Dhttps%3A//visage.surgeplay.com/skin/" + response.uuid + ")")
                    .setImage(response.skin.body)
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