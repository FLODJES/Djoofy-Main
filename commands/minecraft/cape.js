const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');


module.exports = {    
    name: "cape",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "cape",
    description: "Get the optifine cape from a Java player.",
    aliases: ["cape", "optifine"],
    usage: config["prefix"] + "cape [username]",
    category: config["categories"][0],
    execute : async (message, args) => {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then( async (response) => {

            /* // Download the cape file. No need to.
            const file = fs.createWriteStream("./files/cape.png");
            const request = http.get(`http://s.optifine.net/capes/${response.username}.png`, function(response) {
            response.pipe(file);
            });
            */
            
            await Jimp.read(`http://s.optifine.net/capes/${response.username}.png`)
            .then(cape => {
                cape
                .resize(920, 440, Jimp.RESIZE_NEAREST_NEIGHBOR, (err, cape) => {cape.crop( 20, 20, 200, 300 )})
                .write('./files/capeFinal.png');
            })
            .catch(err => {
                // console.error(err);
                // Create embed (user doesn't have a cape)
                const noCape = new Discord.MessageEmbed()
                    .setTitle(response.username + " doesn't have an Optifine cape.")
                    .setFooter("Made by FLODJES#5225")
                    .setTimestamp();
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        noCape.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(noCape);
                const path = './files/capeFinal.png'

                fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
                })

            });

                // Create embed (user had a cape)
                const cape = new Discord.MessageEmbed()
                    .setTitle("Optifine cape from " + response.username + ".")
                    .attachFiles(['./files/capeFinal.png'])
                    .setImage('attachment://capeFinal.png')
                    .setFooter("Made by FLODJES#5225")
                    .setTimestamp();
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        cape.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(cape);
        
        })

    },
}; 

