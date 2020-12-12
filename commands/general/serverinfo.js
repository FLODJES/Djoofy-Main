const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {    
    name: "serverinfo",
    description: "Give info about the server",
    aliases: ["serverinfo"],
    usage: config["prefix"] + "serverinfo",
    category: config["categories"][1],
    execute(message) {
        const member = message.mentions.members.first() || message.member;

        const roles = message.guild.roles.cache
        .filter(r => r.id !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(",");
        const rolesCount = (message.guild.roles.cache.filter(r => r.id !== message.guild.id)).size
        
        const members = message.guild.members.cache;
        const emojis = message.guild.emojis.cache;

        const timeCreated = new Intl.DateTimeFormat('en-US').format(message.guild.createdTimestamp)

        // Create embed
        const Embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("__General__", stripIndents`
                **❯ Name:** ${message.guild.name}
                **❯ Owner:** <@!${message.guild.ownerID}>
                **❯ Region:** ${regions[message.guild.region]}
                **❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}
                **❯ Created:** ${timeCreated}
                `, true)
            .addField("__Statistics__", stripIndents`
                **❯ Member Count:** ${message.guild.memberCount.toLocaleString()}
                **❯ Role Count:** ${rolesCount.toLocaleString()}
                **❯ Emoji Count:** ${emojis.size}
                **❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}
                **❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}
                `, true)
            .setTimestamp()
            .setFooter(message.guild.name);

        message.channel.send(Embed);
    }
  }