// Mongo import
const mongoose = require('mongoose');
require('dotenv').config();
//initialize Discord
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//setting up DB Schema for Discord users
const Users = require("./schemas/UserSchema");
const { db } = require('./schemas/UserSchema');
//Command prefix
const prefix = '!';
//Database connection
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
// Client command detection/execution
// TODO export commands to seperate files (may have more verbose commands in the future)
client.on('message', async message =>{
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let greetings = ['Hello', 'Hey', 'Привет', 'Dzień dobry']
    const user = await db.collection('users').findOne({ discordId: message.author.id });
    switch(command)
    {
        case 'hey' || 'hi' || 'hello':
            message.channel.send(greetings[Math.floor(Math.random()*greetings.length)])
        break;
        case 'addme':
            if(user == null)
            {
                const newUser = Users.create({
                    username: message.author.username,
                    discordId: message.author.id,
                    vice: " ",
                    currentStreak: Date.now()
                })
                message.channel.send(message.author.username +" has been added to ViceBot!");
            }else{
                message.channel.send(message.author.username +" has already been added to ViceBot!");
            }
        break;
        case 'givemonkey':
        case 'gibmonki':
            message.channel.send("https://www.placemonkeys.com/500/350?random=" + Math.floor(Math.random()*5000));
            break;
        case 'setvice':
            db.collection('users').updateOne({discordId: message.author.id}, {$set: {vice: args}}, {upsert: true});
            message.channel.send("Vice updated to: " + args);
            break;
        case 'getuserinfo':
            console.log(user);
            message.channel.send("Username: " + user.username + " Vice: " + user.vice);
            break;
        case 'start':
            db.collection('users').updateOne({discordId: message.author.id}, {$set: {currentStreak: Date.now()}}, {upsert: true});
            message.channel.send("Challenge begun!");
            break;
        case 'failed':
            var lengthLasted = Date.now() - user.currentStreak;
            lengthLasted = convertMS(lengthLasted);
            db.collection('users').updateOne({discordId: message.author.id}, {$set: {currentStreak: Date.now()}}, {upsert: true});
            if(lengthLasted.day <= 2)
            {message.channel.send("Oh no! You only lasted " + lengthLasted.day +" days, " + lengthLasted.hour +" hours, " +lengthLasted.minute+" minutes, and " +lengthLasted.seconds+" seconds without " + user.vice + ". Do better next time!");}
            else if(lengthLasted.day <= 6 && lengthLasted.day > 2)
            {message.channel.send("Getting better! You lasted " + lengthLasted.day +" days, " + lengthLasted.hour +" hours, " +lengthLasted.minute+" minutes, and " +lengthLasted.seconds+" seconds without " + user.vice + ". Keep up the good work!");}
            else if(lengthLasted.day <= 20 && lengthLasted.day > 6)
            {message.channel.send("Nice work! You lasted " + lengthLasted.day +" days, " + lengthLasted.hour +" hours, " +lengthLasted.minute+" minutes, and " +lengthLasted.seconds+" seconds without " + user.vice + ". So close to a month!");}
            else if(lengthLasted.day > 20)
            {message.channel.send("Legendary! You lasted " + lengthLasted.day +" days, " + lengthLasted.hour +" hours, " +lengthLasted.minute+" minutes, and " +lengthLasted.seconds+" seconds without " + user.vice + ". Now get back out there!");}
            break;
        case 'checkstreak':
            var lengthLasted = Date.now() - user.currentStreak;
            lengthLasted = convertMS(lengthLasted);
            message.channel.send("Current streak: " + lengthLasted.day +" days, " + lengthLasted.hour +" hours, " +lengthLasted.minute+" minutes, and " +lengthLasted.seconds+" seconds without " + user.vice + ".");
            break;
        case 'help':
            message.channel.send("```Vice Bot commands: \n!help - Displays this menu\n!addMe - Adds user to ViceBot database\n!setVice - Sets user's vice\n!start - Begins timer on vice streak\n!failed - Ends and resets streak\n!checkStreak - Shows current streak length\nFeel free to make recommendations for new commands!```");
            break;
    }
});

function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

//log in to bot
client.login(process.env.TOKEN);


