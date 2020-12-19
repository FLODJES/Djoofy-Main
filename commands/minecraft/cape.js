const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Canvas = require('canvas');


module.exports = {    
    name: "cape",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "cape",
    description: "Get the cape from a Java player.",
    aliases: ["cape", "c"],
    usage: config["prefix"] + "cape [username]",
    category: config["categories"][0],
    execute : async (message, args) => {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];
        const response = mcdata.playerStatus(user).then((response) => {
            console.log(response);
        });

            const canvas = Canvas.createCanvas(210, 310);
            const ctx = canvas.getContext('2d');


            const capeImage = await Canvas.loadImage('./files/cape.png');
            ctx.drawImage(capeImage, 0, 0, canvas.width, canvas.height);
            // Use helpful Attachment class structure to process the file for you
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './files/cape.png');

            message.channel.send(attachment);

    },
}; 

                // Create embed
                /* const Embed = new Discord.MessageEmbed()
                    .setTitle("Player Cape")
                    .addField("**__Username__**", "❯ `" + response.username + "`")
                    .setImage(attachment)
                    .setFooter("Made by FLODJES#5225")
                    .setTimestamp();
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(Embed);  */