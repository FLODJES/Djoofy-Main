const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const fetch = require("node-fetch");



module.exports = {    
    name: "bedwars",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "bedwars",
    description: "Get the Hypixel bedwars stats from a player.",
    aliases: ["bedwars", "bw"],
    usage: config["prefix"] + "bedwars [username]",
    category: config["categories"][1],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];

        mcdata.playerStatus(user).then( async (response) => {
            // console.log("username: " + response.username);  


            const stats = await fetch(`https://api.slothpixel.me/api/players/${response.username}`);
            const data = await stats.json();
            // console.log(data.stats.BedWars) // Get all the different variables you can use.
            let level = "✫" + data.stats.BedWars.level // gets the user level
            let coins = data.stats.BedWars.coins // gets the user coins
            let wins = data.stats.BedWars.wins // gets the user wins
            let losses = data.stats.BedWars.losses // gets the user losses
            let w_l = data.stats.BedWars.w_l // gets the user w_l
            let winstreak = data.stats.BedWars.winstreak // gets the user winstreak

            let kills = data.stats.BedWars.kills // gets the user kills
            let deaths = data.stats.BedWars.deaths // gets the user deaths
            let k_d = data.stats.BedWars.k_d // gets the user k_d
            let beds_broken = data.stats.BedWars.beds_broken // gets the user beds broken
            let beds_lost = data.stats.BedWars.beds_lost // gets the user beds lost
            let bed_ratio = data.stats.BedWars.bed_ratio // gets the user bed ratio

            let final_kills = data.stats.BedWars.final_kills // gets the user final_kills
            let final_deaths = data.stats.BedWars.final_deaths // gets the user final_deaths
            let final_k_d = data.stats.BedWars.final_k_d // gets the user final_k_d


                // Create embed
                const Embed = new Discord.MessageEmbed()
                    // .attachFiles(['./files/mainImage.png'])
                    .setTitle(response.username + "'s Bedwars stats.")
                    .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#BedWars")
                    .setThumbnail(response.skin.headleft)
                    .addField("__General Stats:__", stripIndents`
                    **❯ Star:** \`${level}\`
                    **❯ Coins:** \`${coins}\`
                    **❯ Wins:** \`${wins}\`
                    **❯ Losses:** \`${losses}\`
                    **❯ W/L ratio:** \`${w_l}\`
                    **❯ Winstreak:** \`${winstreak}\`
                    `, true)
                    .addField("__Spicy Stats:__", stripIndents`
                    **❯ Kills:** \`${kills}\`
                    **❯ Deaths:** \`${deaths}\`
                    **❯ K/D ratio:** \`${k_d}\`
                    **❯ Beds broken:** \`${beds_broken}\`
                    **❯ Beds lost:** \`${beds_lost}\`
                    **❯ Bed ratio:** \`${bed_ratio}\`
                    `, true)
                    .addField("__Kill/Dead Stats:__", stripIndents`
                    **❯ Final kills:** \`${final_kills}\`
                    **❯ Final deaths:** \`${final_deaths}\`
                    **❯ Final K/D ratio:** \`${final_k_d}\`
                    `)
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