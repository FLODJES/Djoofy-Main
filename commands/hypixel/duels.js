const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const mcdata = require('mcdata');
const config = require("../../config.json");
const Jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const fetch = require("node-fetch");



module.exports = {    
    name: "duels",
    helpname: "[NEW!](https://top.gg/bot/780154878395547670/vote) " + config["prefix"] + "duels",
    description: "Get the Hypixel duels stats from a player.",
    aliases: ["duels"],
    usage: config["prefix"] + "duels [username] [duel]",
    category: config["categories"][1],
    execute(message, args) {
        
        if(!args[0]) return message.channel.send("You must include a minecraft Java player's ign")
        const user = args[0];
        const gameMode = args[1];

        mcdata.playerStatus(user).then( async (response) => {
            // console.log("username: " + response.username);  


            const hypixelAPI = await fetch(`https://api.hypixel.net/player?key=5123a70d-5ac6-48e8-95b9-6a56e3a9f000&uuid=${response.uuid}`);
            const hypixel = await hypixelAPI.json();
            

            const stats = await fetch(`https://api.slothpixel.me/api/players/${response.username}`);
            const data = await stats.json();
            // console.log(data.stats.Duels.gamemodes) // Get all the different variables you can use
            // console.log(hypixel.player.stats.Duels)
            const duelData = data.stats.Duels.gamemodes

            let wins;
            let losses;
            let win_loss_ratioCheck;
            let win_loss_ratioRounded;
            let win_loss_ratio;
            let kills;
            let deaths;
            let kill_death_ratioCheck;
            let kill_death_ratioRounded;
            let kill_death_ratio;

            /* Nodebuff */
            let heal_pots_used;
            
            /* All game variables (needs to be donne before Prestige) */
            if(!gameMode){
                wins = data.stats.Duels.general.wins // gets the user wins
                coins = data.stats.Duels.general.coins // gets the user coins
                losses = data.stats.Duels.general.losses // gets the user losses
                win_loss_ratioCheck = data.stats.Duels.general.win_loss_ratio // gets the user win_loss_ratio
                win_loss_ratioRounded = win_loss_ratioCheck.toFixed(2);
                win_loss_ratio = Number(win_loss_ratioRounded);
                kills = data.stats.Duels.general.kills // gets the user kills
            }
            else {
                switch(gameMode) {
                    case "uhc": // Work in progress
                        break;
                    case "skywars": // Work in progress
                        wins = (
                            data.stats.Duels.gamemodes.skywars
                            ); 
                        break;
                    case "megawalls": // Work in progress
                        wins = data.stats.Duels.gamemodes.mega_walls_duels.wins 
                        break;
                    case "sumo": // Donne
                        wins = duelData.sumo.wins;
                        if (!duelData.sumo.wins){ wins = "0"}
                        losses = duelData.sumo.losses;
                        if (!duelData.sumo.losses){ 
                            losses = "0"
                            win_loss_ratio = wins
                        } else {
                        win_loss_ratioCheck = duelData.sumo.wins / duelData.sumo.losses;
                        win_loss_ratioRounded = win_loss_ratioCheck.toFixed(2);
                        win_loss_ratio = Number(win_loss_ratioRounded)
                        }

                        kills = duelData.sumo.kills;
                        if (!duelData.sumo.kills){ kills = "0"}
                        deaths = duelData.sumo.deaths;
                        if (!duelData.sumo.deaths){ 
                            deaths = "0"
                            kill_death_ratio = kills
                        } else {
                        kill_death_ratioCheck = duelData.sumo.kills / duelData.sumo.deaths;
                        kill_death_ratioRounded = kill_death_ratioCheck.toFixed(2);
                        kill_death_ratio = Number(kill_death_ratioRounded);
                        }
                        break;
                    case "op": // Work in progress
                        wins = data.stats.Duels.gamemodes.op_duels.wins
                        break;
                    case "bridge": // Work in progress
                        wins = (
                            data.stats.Duels.gamemodes.bridge
                            );
                        break;
                    case "bow": // Work in progress
                        wins = data.stats.Duels.gamemodes
                        break;
                    case "classic": // Work in progress
                        wins = data.stats.Duels.gamemodes.classic_duel.wins
                        break;
                    case "nodebuff": // Donne
                        wins = duelData.potion_duel.wins 
                        if (!duelData.potion_duel.wins){ wins = "0"}
                        losses = duelData.potion_duel.losses;
                        if (!duelData.potion_duel.losses){ 
                            losses = "0"
                            win_loss_ratio = wins
                        } else {
                        win_loss_ratioCheck = duelData.potion_duel.wins / duelData.potion_duel.losses;
                        win_loss_ratioRounded = win_loss_ratioCheck.toFixed(2);
                        win_loss_ratio = Number(win_loss_ratioRounded)
                        }

                        kills = duelData.potion_duel.kills;
                        if (!duelData.potion_duel.kills){ kills = "0"}
                        deaths = duelData.potion_duel.deaths;
                        if (!duelData.potion_duel.deaths){ 
                            deaths = "0"
                            kill_death_ratio = kills
                        } else {
                        kill_death_ratioCheck = duelData.potion_duel.kills / duelData.potion_duel.deaths;
                        kill_death_ratioRounded = kill_death_ratioCheck.toFixed(2);
                        kill_death_ratio = Number(kill_death_ratioRounded)
                        }

                        heal_pots_used = duelData.potion_duel.heal_pots_used
                        if (!duelData.potion_duel.heal_pots_used){ heal_pots_used = "0"}
                        break;
                    case "blitz": // Work in progress
                        wins = data.stats.Duels.gamemodes.blitz_duel.wins
                        break;
                    case "combo": // Work in progress
                        wins = data.stats.Duels.gamemodes.combo_duel.wins
                        break;
                    case "spleef": // Work in progress
                        wins = data.stats.Duels.gamemodes
                        break;
                };
            ;}

    
            // Prestige:
            function getDivision(wins) {
                let prestige;
                // Switch statement
                switch(true) {
                    case (wins > 56000):
                        prestige = "Godlike X"
                    break;
                    case (wins > 52000):
                        prestige = "Godlike IX"
                    break;
                    case (wins > 48000):
                        prestige = "Godlike VIII"
                    break;
                    case (wins > 44000):
                        prestige = "Godlike VII"
                    break;
                    case (wins > 40000):
                        prestige = "Godlike VI"
                    break;
                    case (wins > 36000):
                        prestige = "Godlike V"
                    break;
                    case (wins > 32000):
                        prestige = "Godlike IV"
                    break;
                    case (wins > 28000):
                        prestige = "Godlike III"
                    break;
                    case (wins > 24000):
                        prestige = "Godlike II"
                    break;
                    case (wins > 20000):
                        prestige = "Godlike"
                    break;
                    case (wins > 18000):
                        prestige = "Grandmaster V"
                    break;
                    case (wins > 16000):
                        prestige = "Grandmaster IV"
                    break;
                    case (wins > 14000):
                        prestige = "Grandmaster III"
                    break;
                    case (wins > 12000):
                        prestige = "Grandmaster II"
                    break;
                    case (wins > 10000):
                        prestige = "Grandmaster"
                    break;
                    case (wins > 8800):
                        prestige = "Legend V"
                    break;
                    case (wins > 7600):
                        prestige = "Legend IV"
                    break;
                    case (wins > 6400):
                        prestige = "Legend III"
                    break;
                    case (wins > 5200):
                        prestige = "Legend II"
                    break;
                    case (wins > 4000):
                        prestige = "Legend"
                    break;
                    case (wins > 3800):
                        prestige = "Master V"
                    break;
                    case (wins > 3200):
                        prestige = "Master IV"
                    break;
                    case (wins > 2800):
                        prestige = "Master III"
                    break;
                    case (wins > 2400):
                        prestige = "Master II"
                    break;
                    case (wins > 2000):
                        prestige = "Master"
                    break;
                    case (wins > 1800):
                        prestige = "Diamond V"
                    break;
                    case (wins > 1600):
                        prestige = "Diamond IV"
                    break;
                    case (wins > 1400):
                        prestige = "Diamond III"
                    break;
                    case (wins > 1200):
                        prestige = "Diamond II"
                    break;
                    case (wins > 1000):
                        prestige = "Diamond"
                    break;
                    case (wins > 900):
                        prestige = "Gold V"
                    break;
                    case (wins > 800):
                        prestige = "Gold IV"
                    break;
                    case (wins > 700):
                        prestige = "Gold III"
                    break;
                    case (wins > 600):
                        prestige = "Gold II"
                    break;
                    case (wins > 500):
                        prestige = "Gold"
                    break;
                    case (wins > 440):
                        prestige = "Iron V"
                    break;
                    case (wins > 380):
                        prestige = "Iron IV"
                    break;
                    case (wins > 320):
                        prestige = "Iron III"
                    break;
                    case (wins > 260):
                        prestige = "Iron II"
                    break;
                    case (wins > 200):
                        prestige = "Iron"
                    break;
                    case (wins > 180):
                        prestige = "Rookie V"
                    break;
                    case (wins > 160):
                        prestige = "Rookie IV"
                    break;
                    case (wins > 140):
                        prestige = "Rookie III"
                    break;
                    case (wins > 120):
                        prestige = "Rookie II"
                    break;
                    case (wins > 100):
                        prestige = "Rookie"
                    break;
                    case (wins < 99):
                        prestige = "None"
                    break;
                };
                return prestige
            }
            let prestige = getDivision(wins)
            let gamePrestige = getDivision(wins * 2)

            // Create embed
            let Embed;

            if(!gameMode){
                Embed = new Discord.MessageEmbed()
                .setTitle(response.username + "'s Duels stats.")
                .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                .setThumbnail(response.skin.headleft)
                .setDescription(prestige)
                .addField("__General Stats:__", stripIndents`
                **❯ Wins:** \`${wins}\`
                **❯ Losses:** \`${losses}\`
                **❯ W/L ratio:** \`${win_loss_ratio}\`
                **❯ Kills:** \`${kills}\`
                **❯ Coins:** \`${coins}\`
                `)
                .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                .setTimestamp();
                if (message.channel.type != "dm" ) {
                    const member = message.mentions.members.first() || message.member;
                    Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                };
            }
            else {
                switch(gameMode) {
                    case ("uhc"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The uhc stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__UHC Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("skywars"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Skywars stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Skywars Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("megawalls"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Megawalls stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Megawalls Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("sumo"): // Donne

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Sumo stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Sumo Stats:__", stripIndents`
                        **❯ Wins:** \`${wins}\`
                        **❯ Losses:** \`${losses}\`
                        **❯ W/L ratio:** \`${win_loss_ratio}\`

                        **❯ Kills:** \`${kills}\`
                        **❯ Deaths:** \`${deaths}\`
                        **❯ K/D ratio:** \`${kill_death_ratio}\`
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("op"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Op stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Op Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("bridge"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Bridge stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Bridge Stats:__", stripIndents`
                        **Work in progress, sorry. Comming soon!**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("bow"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Bow stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Bow Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("classic"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Classic stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Classic Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("nodebuff"): // Donne

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Nodebuff stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Nodebuff Stats:__", stripIndents`
                        **❯ Wins:** \`${wins}\`
                        **❯ Losses:** \`${losses}\`
                        **❯ W/L ratio:** \`${win_loss_ratio}\`

                        **❯ Kills:** \`${kills}\`
                        **❯ Deaths:** \`${deaths}\`
                        **❯ K/D ratio:** \`${kill_death_ratio}\`

                        **❯ Heal-pots used:** \`${heal_pots_used}\`
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("blitz"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Blitz stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Blitz Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("combo"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Combo stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Combo Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                    case ("spleef"): // Work in progress

                        Embed = new Discord.MessageEmbed()
                        .setTitle(response.username + "'s The Spleef stats.")
                        .setURL("https://plancke.io/hypixel/player/stats/" + response.username + "#Duels")
                        .setThumbnail(response.skin.headleft)
                        .setDescription(gamePrestige)
                        .addField("__Spleef Stats:__", stripIndents`
                        **Work in progress, sorry.**
                        `)
                        .setFooter("Made by FLODJES#5225", "https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png")
                        .setTimestamp();
                        if (message.channel.type != "dm" ) {
                            const member = message.mentions.members.first() || message.member;
                            Embed.setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor);
                        };
                    break;
                };
            }

                message.channel.send(Embed);
        })



    },
}; 