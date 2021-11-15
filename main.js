const mongoose = require('mongoose');
require('dotenv').config();

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

const UserSchema = new mongoose.Schema({
    username: mongoose.SchemaType.String,
    discordId: {type: mongoose.SchemaType.String, required: true,},
    currentStreak: Number
});

module.exports = mongoose.model('Users', UserSchema);

client.on('message', message =>{
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let greetings = ['Hello', 'Hey', 'Привет', 'Dzień dobry']

    if(command === 'hello' || command === 'hi' || command === 'hey')
    {
        message.channel.send(greetings[Math.floor(Math.random()*greetings.length)])
    }
    else if(command === 'addMe')
    {
        const newUser = User.create({
            username: message.author,
            discordId: message.author.id,
            currentStreak: 0
        })
        const savedUser = newUser.save();
        
        message.channel.send(message.author +" has been added to ViceBot!");
    }
});

//log in to bot
client.login(TOKEN);


