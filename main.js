const mongoose = require('mongoose');
require('dotenv').config();

const testSchema = require('./test-schema');
//initialize Discord
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//create Bot

const prefix = '!';

client.once('ready', async () =>
{
    console.log('Vicebot is online.')

    await mongoose.connect(
        process.env.MONGO_URI,
        {
            keepAlive: true,
        }
    ).then(()=>{console.log('Connected to database.');
    }).catch((err) =>{console.log(err);
})
});

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
client.login('OTA4NzY2MDQwNDk2OTQzMTI0.YY6gVA.raRPEtd-9en1vshMpIWp049lqng');


