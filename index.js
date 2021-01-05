const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "-";
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready' , () => {
    console.log('El bot esta online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong');
    }else if(command === 'play'){
        client.commands.get('play').execute(message,args);
    }else if(command === 'leave'){
        client.commands.get('leave').execute(message,args);
    }
})

client.login('NzIzNTM3NzIwMTk4MDM3NTA0.XuzFAw.Wfr3sR4eHduKmopYzXG4qw6IGxk')