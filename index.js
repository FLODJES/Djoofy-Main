const fs = require("fs");
const Discord = require("discord.js");

process.stdin.setEncoding("utf8");

const { prefix, owner } = require("./config.json");
const { token } = require("./token.json");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));


// Add commands to client.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
	console.log(`${command.name} has been loaded.`)
}

// Check for an image function
function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}

// Bot startup
client.on("ready", () => {
	console.log("Logged in as " + client.user.tag);
	client.user.setActivity("Being devoloped :))", { type: "PLAYING" });

});


// Receive messages and respond
client.on("message", message => {
	if (message.author.bot || message.channel.type === "dm" 
	||!message.content.startsWith(prefix)) return;
	

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Display commands in the console
	console.log(`${message.author.avatar, message.author.username}: ` + message.content);

	// Check if it's an existing command
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Check if user has permissions to execute this command
	if (command.perms && !message.member.hasPermission(command.perms) || command.userID && message.author.id != command.userID) {
		return message.reply("you don't have permission to execute this command.");
	}

	// Check if command needs arguments and if so and no arguments are given tell user
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Executing command and catching errors
	try {
		if (command.name === "gif") {
			command.execute(message, args, gifs);
		} else if (command.name === "role") {
			command.execute(message, args, roles);
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}

});

// Send text that has been written in the console
/* process.stdin.on("readable", () => {
	let chunk;
	while ((chunk = process.stdin.read()) !== null) {
		const channel = client.channels.cache.get("779977710012727316");
		try {
			channel.send(chunk);
		} catch (error) {
			console.error(error);
			console.log("An error occured while trying to send a message to CrumblingCity.574561977880281088");
		}
		
	}
}); */

// Handling errors
client.on("shardError", error => {
	console.error("A websocket connection encountered an error:", error);
});

process.on("unhandledRejection", error => {
	console.error("Unhandled promise rejection:", error);
});

// Logging in
client.login(token);