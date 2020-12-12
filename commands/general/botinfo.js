const Discord = require("discord.js");
const config = require("../../config.json");
const { MessageEmbed, version: djsversion } = require('discord.js');
const { stripIndents } = require("common-tags");
const { version } = require('../../package.json');
const os = require('os');
const ms = require('ms');

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}


module.exports = {    
    name: "botinfo",
    description: "Give info about **Djoofy**",
    aliases: ["botinfo", "bot"],
    usage: config["prefix"] + "botinfo",
    category: config["categories"][0],
    execute(message) {
        
        
        const client = new Discord.Client();
        const core = os.cpus()[0];

        const created = new Intl.DateTimeFormat('en-US').format(message.client.user.createdTimestampt);

        const member = message.mentions.members.first() || message.member;
        
        // Create embed 
        const Embed = new Discord.MessageEmbed()
            .attachFiles(["./files/icon.gif"])
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .setThumbnail("attachment://icon.gif")
            .setDescription(`**__Djoofy's__ information**`)
            .addField("__General information__", stripIndents`
                **❯ Client:** <@!${message.client.user.id}> 
                **❯ Servers:** ${message.client.guilds.cache.size}
                **❯ Creation Date:** ${created}
                **❯ Node.js:** ${process.version}
                **❯ Version:** v${version}
                **❯ Discord.js:** v${djsversion}
                `, true)
            .addField("__System information__", stripIndents`
                **❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}
                **❯ Created at:** ${created}
                **❯ CPU:**
                \u3000 Cores: ${os.cpus().length}
                \u3000 Model: ||pirvate sowwyyyy :)))||
                \u3000 Speed: ${core.speed}MHz
                `, true) 
            .setTimestamp()
            .setFooter("Made by FLODJES#5225");

        message.channel.send(Embed);
    }
  }