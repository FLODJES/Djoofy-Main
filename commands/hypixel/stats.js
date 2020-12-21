const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const fetch = require("node-fetch");



module.exports = {    
    name: "stats",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "stats",
    description: "Get the Hypixel stats from a player.",
    aliases: ["stats", "hypixel"],
    usage: config["prefix"] + "stats [username]",
    category: config["categories"][1],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then( async (response) => {
            // console.log("username: " + response.username);  


            /* new Jimp(2000, 500, '#FF00FF', async function (err, image) {
                await Jimp.read('./files/exp.png', async function (err, exp) {
                    exp.scaleToFit(1980, 150, Jimp.RESIZE_NEAREST_NEIGHBOR)
                    image.getBufferAsync(Jimp.MIME_PNG);
                    if (err) console.log("error found wile reading exp.");
                    if (err) console.log(err);
                    image.composite(exp, 10, 10);
                    await Jimp.read('./files/achievementPoints.png', function (err, achievementPoints) {
                        achievementPoints.scaleToFit(1980, 150, Jimp.RESIZE_NEAREST_NEIGHBOR)
                        image.composite(achievementPoints, 10, 110);
                        image.write('./files/mainImage.png');
                    });
                });
            }); */

            const stats = await fetch(`https://api.slothpixel.me/api/players/${response.username}`);
            const data = await stats.json();
            
            let rankCheck = data.rank // gets the user rank
            let rank;

            if (!rankCheck){
                rank = 'Non'
            }
            else if (rankCheck === 'VIP'){
                rank = 'VIP'
            }
            else if (rankCheck === 'VIP_PLUS'){
                rank = 'VIP+'
            }
            else if (rankCheck === 'MVP'){
                rank = 'MVP'
            }
            else if (rankCheck === 'MVP_PLUS'){
                rank = 'MVP+'
            }
            else if (rankCheck === 'MVP_PLUS_PLUS'){
                rank = 'MVP++'
            }
            else if (rankCheck === 'YOUTUBER'){
                rank = 'YouTuber'
            }
            else if (rankCheck === 'HELPER'){
                rank = 'Helper'
            }
            else if (rankCheck === 'MOD'){
                rank = 'Moderator'
            }
            else if (rankCheck === 'ADMIN'){
                rank = 'Administrator'
            } 

            let level = data.level // gets the user level
            let karma = data.karma // gets the user karma
            let achievementPoints = data.achievement_points // gets the user achievement points
            let quests = data.quests_completed // gets the user amount of quest completed


                // Create embed
                const Embed = new Discord.MessageEmbed()
                    // .attachFiles(['./files/mainImage.png'])
                    .setTitle(response.username + "'s Hypixel stats.")
                    .setURL("https://plancke.io/hypixel/player/stats/" + response.username)
                    .setThumbnail(response.skin.headleft)
                    .addField("User stats:", stripIndents`
                    **❯ Rank:** \`${rank}\`
                    **❯ Network Level:** \`${level}\`
                    **❯ Achievement Points:** \`${achievementPoints}\`
                    **❯ Karma:** \`${karma}\`

                    **❯ Quest completed:** \`${quests}\`
                    `, true)
                    // .setImage('attachment://mainImage.png')
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