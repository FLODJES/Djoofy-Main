const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const util = require('minecraft-server-util');
const config = require("../../config.json");
const fs = require("fs");
decode64 = require("base-64").decode;


module.exports = {    
    name: "server",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "server",
    description: "Get the serverinformation from a minecraft server.",
    aliases: ["server"],
    usage: config["prefix"] + "server [ip]",
    category: config["categories"][0],
    execute(message, args) {
        
        const serverIP = args[0] || 'play.hypixel.net';

        // Log the server status
        util.status(serverIP) // port is default 25565
            .then((response) => {
                // console.log(response); // For the response, dissabled for log feed.
                var icon = response.favicon.replace("data:image/png;base64,", " ")
                var base64str = icon;
                var bitmap = new Buffer.alloc(16384, base64str.toString(), 'base64');
                fs.writeFileSync('./files/server-icon.png', bitmap);

                // Create embed
                const Embed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .attachFiles('./files/server-icon.png')
                    .setThumbnail('attachment://server-icon.png')
                    .setTitle('__Server Status__')
                    .addField('**❯ Server IP:**', "`" + response.host + "`")
                    .addField('**❯ Server Version:**', response.version)
                    .addField('**❯ Online Players:**', response.onlinePlayers)
                    .addField('**❯ Max Players:**', response.maxPlayers)
                    .setFooter("Made by FLODJES#5225")
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(Embed);
            }).catch((error) => {
                message.reply("could you please send a valid server-IP?");
                console.log(error);
            })

    },
}; 