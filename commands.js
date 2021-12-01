function addMe(user){
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
}

function giveMonkey(){
    message.channel.send("https://www.placemonkeys.com/500/350?random=" + Math.floor(Math.random()*5000));
}

