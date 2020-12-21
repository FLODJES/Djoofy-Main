const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const fetch = require("node-fetch");



module.exports = {    
    name: "skywars",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "skywars",
    description: "Get the Hypixel skywars stats from a player.",
    aliases: ["skywars", "sw"],
    usage: config["prefix"] + "skywars [username]",
    category: config["categories"][1],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then( async (response) => {
            // console.log("username: " + response.username);  


            const stats = await fetch(`https://api.slothpixel.me/api/players/${response.username}`);
            const data = await stats.json();
            // console.log(data.stats.SkyWars) // Get all the different variables you can use.
            let checkLevel = data.stats.SkyWars.level // gets the user level
            let level;
            if (checkLevel > 5 && checkLevel < 9){
                level = "Iron Prestige " + checkLevel 
              }
            else if (checkLevel > 10 && checkLevel < 14){
                level = "Gold Prestige " + checkLevel
            }
            else if (checkLevel > 15 && checkLevel < 19){
                level = "Diamond Prestige " + checkLevel
            }
            else if (checkLevel > 20 && checkLevel < 24){
                level = "Emerald Prestige " + checkLevel
            }
            else if (checkLevel > 25 && checkLevel < 29){
                level = "Sapphire Prestige " + checkLevel
            }
            else if (checkLevel > 30 && checkLevel < 34){
                level = "Ruby Prestige " + checkLevel
            }
            else if (checkLevel > 35 && checkLevel < 39){
                level = "Crystal Prestige " + checkLevel
            }
            else if (checkLevel > 40 && checkLevel < 44){
                level = "Opal Prestige " + checkLevel
            }
            else if (checkLevel > 45 && checkLevel < 49){
                level = "Amethyst Prestige " + checkLevel
            }
            else if (checkLevel > 50 && checkLevel < 59){
                level = "Rainbow Prestige " + checkLevel
            }
            else if (checkLevel > 30){
                level = "Mythic Prestige " + checkLevel
            }
            else {
                level = checkLevel
            }
            let coins = data.stats.SkyWars.coins // gets the user coins
            let wins = data.stats.SkyWars.wins // gets the user wins
            let losses = data.stats.SkyWars.losses // gets the user losses
            let win_loss_ratio = data.stats.SkyWars.win_loss_ratio // gets the user win_loss_ratio
            let kills = data.stats.SkyWars.kills // gets the user kills
            let deaths = data.stats.SkyWars.deaths // gets the user deaths
            let assists = data.stats.SkyWars.assists // gets the user assists
            let kill_death_ratio = data.stats.SkyWars.kill_death_ratio // gets the user kill_death_ratio
            let souls = data.stats.SkyWars.souls // gets the user souls




                // Create embed
                const Embed = new Discord.MessageEmbed()
                    // .attachFiles(['./files/mainImage.png'])
                    .setTitle(response.username + "'s Skywars stats.")
                    .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#SkyWars")
                    .setThumbnail(response.skin.headleft)
                    .addField("__General Stats:__", stripIndents`
                    **❯ Level:** \`${level}\`
                    **❯ Wins:** \`${wins}\`
                    **❯ Losses:** \`${losses}\`
                    **❯ W/L ratio:** \`${win_loss_ratio}\`
                    **❯ Kills:** \`${kills}\`
                    **❯ Deaths:** \`${deaths}\`
                    **❯ Assists:** \`${assists}\`
                    **❯ K/D ratio:** \`${kill_death_ratio}\`
                    **❯ Souls:** \`${souls}\`
                    `, true)
                    .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Skywars-64.png")
                    .setTimestamp();
                    if (message.channel.type != "dm" ) {
                        const member = message.mentions.members.first() || message.member;
                        Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                    };
                message.channel.send(Embed);
        })



    },
}; 