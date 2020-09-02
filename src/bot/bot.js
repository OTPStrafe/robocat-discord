const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios').default


const DabiImages = require("dabi-images");
const DabiClient = new DabiImages.Client();



const play = require('../bot/commands/play')
const rnum = require('../bot/commands/roll')






if(process.env.NODE_ENV === 'production'){
    return
} else {
    require('dotenv').config()
}


function init() {
    client.login(process.env.TOKEN);
}

client.on('ready', () => {
  console.log(`Conectado! ${client.user.tag}!`);
});

client.on('message', message => {

	if(message.author.bot) return;

	const commandHandler = message.content.trim().toLowerCase()
	const argsHandler = message.content.trim().toLowerCase().split(' ')
	const prefix = process.env.PREFIX


	if (commandHandler === `${prefix}info`) {
		message.channel.send('Toda la informacion en <#746278725443780699>')
	} else if (commandHandler === `${prefix}roll`){
        
        message.reply(`Tu numero: ${rnum.roll()}`)

    } else if (argsHandler[0] === `${prefix}play`){

        message.channel.send(play.turnPlay(argsHandler[1]))

    
    } else if (commandHandler === `${prefix}poto`){
        if(!message.channel.nsfw) {
            message.channel.send('Intentalo nuevamente en un canal NSFW')
            return;
        }
        async function poto(){
            await DabiClient.nsfw.real.ass().then(json => {
        
                imgURL = json.url
                
                const embed = new Discord.MessageEmbed()
                  .setTitle('Nuevo Poto Generado! :heart:')
                  .setImage(imgURL)
                  .setColor('#1ed3ec')
        
                message.channel.send(embed);
                console.log('Poto generado correctamente')
        
        
            }).catch(error => {
                console.log(error)
            })
        
        }
        poto()
        

    } else if (commandHandler === `${prefix}potoanime`){
        if(!message.channel.nsfw) {
            message.channel.send('Intentalo nuevamente en un canal NSFW')
            return;
        }
        async function potoAnime(){
            await DabiClient.nsfw.hentai.ass().then(json => {
        
                imgURL = json.url

                if(!imgURL || imgURL === null){

                    message.channel.send('Fallo al obtener el poto :broken_heart:')
                    return;
                }
                const embed = new Discord.MessageEmbed()
                  .setTitle('Nueva Foto Anime Generada! :heart:')
                  .setImage(imgURL)
                  .setColor('#1ed3ec')
        
                message.channel.send(embed);
                console.log('Poto generado correctamente')
        
        
            }).catch(error => {
                message.channel.send('Fallo al obtener el poto :broken_heart:')
                console.log(error)
            })
        
        }
        potoAnime()
    } else if (commandHandler === `${prefix}meme`) {
    
        async function loadMeme(){
            try{
                const url = await getMeme()
                const embed = new Discord.MessageEmbed()
                .setImage(url)
                .setTitle('Nuevo Meme Generado! :heart:')
                .setColor('#1ed3ec')
                message.channel.send(embed)
        
            } catch(err){
                message.channel.send('Error :broken_heart:')
                console.log(err)
        
            }
        
        }
        loadMeme()
        

    } else if (argsHandler[0] === `${prefix}dolar`){
        const from = argsHandler[1];
        const to = argsHandler[2];
        const value = argsHandler[3];

        async function loadCurrency(from, to, value){
            try{
                const currency = await getCurrency(from, to, value)

                message.channel.send(currency)
        
            } catch(err){
                message.channel.send('Error :broken_heart:')
                console.log(err)
        
            }
        
        }
        loadCurrency(from, to, value)

        

    }
});



async function getMeme(){
    const response = await axios.get("https://meme-api.herokuapp.com/gimme/deepfriedmemes/2")
    .then(({ data }) => {
        let res = data.memes[0].url
        return res
    })
    .catch(error=>{
    console.log(error);
    });
    
    return response
} 

async function getCurrency(from, to, value){

    let fr = from;
    let t = to;
    let vl = value;

    if(!fr && !t && !vl){
        fr = 'usd'
        t = 'ars'
        vl = '1'
    }
    

    const response = await axios.get(`https://decapi.me/misc/currency?from=${fr}&to=${t}&value=${vl}`)
    .then(({ data }) => {
        let res = data
        return res
    })
    .catch(error=>{
    console.log(error);
    });
    
    return response;
} 








module.exports = {
    init
}