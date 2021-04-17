const Levels = require("discord-xp");

const discord = require('discord.js');

const fs = require('fs');

const client = new discord.Client();



Levels.setURL(process.env.DB);

const d = require("discord.js")

const config = require('./config.json')

const invites = []

const prefix = config.prefix

client.on("message", async (message) => {

 if (!message.guild) return;

 if (message.author.bot) return;

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30

 const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

 if (hasLeveledUp) {

   const user = await Levels.fetch(message.author.id, message.guild.id);

   message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);

 }

});

client.on("message", message => {
    channel = message.channel
    if (message.content == "%invites") {
        let invStrs = []
        invites.forEach(inv => {
            invStrs.push(`${inv.code}`)
        })
        let embed = new d.MessageEmbed().setTitle(`Past Invites`).setDescription(invStrs.join("\n"))
        channel.send(embed)
    }
})

client.on("inviteCreate", async invite => {
    await channel.send(`A new invite link has been created by ${invite.inviter.username} with the id of ${invite.code}.`)
    invites.push(invite)
})

client.on('message', (msg) => {
  if (msg.content === 'thanks') msg.reply('yw');
  if (msg.content === 'not you ray bot') msg.reply('oh sorry');
});

client.on("guildMemberAdd", member => {
    member.guild.channels.cache.get("831629206311534632").send("Welcome!")
})

var http = require('http');

http
	.createServer(function(req, res) {
		res.write('The Server is Running!');
		res.end();
	})
	.listen(8080);


client.on("message", async (message) => {

if (message.content.startsWith(prefix + "rank")) {

 const target = message.mentions.users.first() || message.author; // Grab the target.



const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.



if (!user) return message.channel.send("user has not earned any xp so far.");



message.channel.send(`> **${target.tag}** is currently level ${user.level}.`);

}



})




client.on("ready", () => {
  console.log(`Your bot is running`)

})


client.on("message", async (message) => {

if (message.content.startsWith(prefix + "leaderboard")) {



const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.



if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");



const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.



const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.



message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);

}

})



fs.readdir(__dirname + '/events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(__dirname + `/events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
		console.log('Loading Event: ' + eventName);
	});
});

client.login(process.env.TOKEN);