const mongoose = require('mongoose');

require('dotenv').config();

//initialize Discord
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//create Bot

const Users = require("./schemas/UserSchema")

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

    switch(command)
    {
        case 'hey' || 'hi' || 'hello':
            message.channel.send(greetings[Math.floor(Math.random()*greetings.length)])
        break;
        case 'addme':
            const newUser = Users.create({
                username: message.author.username,
                discordId: message.author.id,
                currentStreak: Date.now()
            })
            message.channel.send(message.author.username +" has been added to ViceBot!");
        break;
        case 'givemonkey':
            message.channel.send("https://www.placemonkeys.com/500/350?random=" + Math.floor(Math.random()*5000));
            break;
    }
});

//log in to bot
client.login(process.env.TOKEN);


