//initialize Discord
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//create Bot

const prefix = '!';

client.once('ready', () =>
{
    console.log('Vicebot is online.')
}
);

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let greetings = ['Hello', 'Hey', 'Привет', 'Dzień dobry']

    if(command === 'hello' || command === 'hi' || command === 'hey')
    {
        message.channel.send(greetings[Math.floor(Math.random()*greetings.length)])
    }
});

//log in to bot
client.login('');


