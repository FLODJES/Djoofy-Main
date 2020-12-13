const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};


module.exports = {    
    name: "whois",
    helpname: config["prefix"] + "whois",
    description: "Give info about a specific user",
    aliases: ["whois", "userinfo"],
    usage: config["prefix"] + "whois [user]",
    category: config["categories"][1],
    execute(message) {

        if (message.channel.type === "dm" ) return message.reply("Sorry, but I can't send any userinfo in DM's.");

        const member = message.mentions.members.first() || message.member;
        
        // Get member roles
        const memberRoles = member.roles.cache
        .filter(r => r.id !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(",");
        console.log( memberRoles );

        const memberRolesCount = (member.roles.cache.filter(r => r.id !== message.guild.id)).size
        console.log( memberRolesCount );
                
        // UGet member data
        const created = new Intl.DateTimeFormat('en-US').format(member.user.createdAt);
        const joined = new Intl.DateTimeFormat('en-US').format(member.joinedAt)
        const userFlags = member.user.flags.toArray();
        
        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__Member information__", stripIndents`
                **❯ Display name:** ${member.displayName}
                **❯ Joined at:**  ${joined} 
                **❯ Roles [${memberRolesCount}]:** ${memberRoles}
                `, true)
            .addField("__User information__", stripIndents`
                **❯ Username:** ${member.user.username}
                **❯ Discord Tag:** ${member.user.tag}
                **❯ Created at:** ${created}
                **❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}
                `)
            .setTimestamp()
            .setFooter(member.displayName, member.user.displayAvatarURL);

        message.channel.send(Embed);
    }
  }