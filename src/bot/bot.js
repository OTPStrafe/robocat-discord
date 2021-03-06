const Discord = require('discord.js'); // Discord
const client = new Discord.Client();

const DabiImages = require("dabi-images"); // NSFW
const DabiClient = new DabiImages.Client();

const axios = require('axios').default // Peticiones
const config = require('../config')


// Algunos Comandos

const play = require('../bot/commands/play')
const rnum = require('../bot/commands/roll')
const meme = require('../bot/commands/meme')
const nsfw = require('../bot/commands/NSFW')
const ball = require('../bot/commands/8ball')
const anime = require('../bot/commands/anime')
const getInfo = require('../bot/commands/info')

// Inicia el bot desde index.js
function init() {
    client.login(config.TOKEN);
}

client.on('ready', () => {
  console.log(`Conectado! ${client.user.tag}!`);
});

client.on('message', message => {

	if(message.author.bot) return;

	// const commandHandler = message.content.trim().toLowerCase()
	// const argsHandler = message.content.trim().toLowerCase().split(' ')
    const prefix = config.PREFIX

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = prefix + args.shift().toLowerCase();


	if(command === `${prefix}info`) {
        let info = getInfo.data
        const embed = new Discord.MessageEmbed()
        .setTitle(info.title)
        .setDescription(info.description)
        .addField(info.fieldName1, info.fieldValue1)
        .addField(info.fieldName2, info.fieldValue2)
        .addField(info.fieldName3, info.fieldValue3)
        .setColor('#1D99BB')
        message.channel.send(embed)
	} else if (command === `${prefix}roll`){
    
        message.reply(`Tu numero: ${rnum.roll()}`)

    } else if (command === `${prefix}play`){

        message.channel.send(play.turnPlay(args))
 
    
    } else if (command === `${prefix}poto`){
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
        

    } else if (command === `${prefix}hentai`){
        if(!message.channel.nsfw) {
            message.channel.send('Intentalo nuevamente en un canal NSFW')
            return;
        }
       async function loadHentai(){
           try {
            const url = await nsfw.getHentai()
            const embed = new Discord.MessageEmbed()
            .setImage(url)
            .setTitle('Hentai Generado! :heart:')
            .setColor('#1ed3ec')
            message.channel.send(embed)
           } catch(err){
            message.channel.send('Error al Generar Fotito Hentai ;(')
            console.log(err)
           }

       }
        loadHentai()
    } else if (command === `${prefix}meme`) {
    
        async function loadMeme(){
            try{
                const url = await meme.getMeme()
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
        

    } else if (command === `${prefix}dolar`){
        const from = args[0];
        const to = args[1];
        const value = args[2];

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

        

    } else if (command === `${prefix}tetica`){
        if(!message.channel.nsfw) {
            message.channel.send('Intentalo nuevamente en un canal NSFW')
            return;
        }
        async function loadBoobs(){
            try {
                const url = await nsfw.getBoobs();
                const embed = new Discord.MessageEmbed()
                .setImage(url)
                .setTitle('Nueva Tetica Generada :heart:')
                .setColor('#1ed3ec')
                message.channel.send(embed)
            } catch (err){
                message.channel.send('Error al generar Tetica :broken_heart:')
                console.log(err)
            }

        }

        
        loadBoobs()
    } else if (command === `${prefix}buscaranime`){

        async function loadSearch(query){
            
            try {
                const data = await anime.searchAnime(query)
                let qs = await anime.searchAnimeFLV(data.title)
                let url = `https://animeflv.net${qs}`
                if(qs === undefined) url = 'No se pudo encontrar el Anime!'
                if(data.title === undefined) return 'No se pudo encontrar el anime.'
                const embed = new Discord.MessageEmbed()
                .setColor('#1ed3ec')
                .setTitle(`Anime encontrado!  :heart:  |   Titulo: ${data.title}`)
                .setDescription(data.syn)
                .setImage(data.image)
                .addField('Episodios ', data.ep)
                .addField('Anime SubEspañol: ', url)
                .addField('Más informacion: ', data.url)
                .setFooter(`${data.score}`, 'http://www.rw-designer.com/icon-image/1461-256x256x8.png')
                message.channel.send(embed)
            } catch(err){
                console.log(err)
                message.channel.send('Algo salio mal... :cry:')
            } 
        }

        let query = [args]
        loadSearch(verifyQuery(query))

        
        
        
        // loadSearch(query)
    } else if (command === `${prefix}buscarmanga`){

         
        

        async function loadManga(query){
            try{
                let response = await anime.searchManga(query)
                if(response.title === undefined){
                    message.channel.send(response)
                    return;
                }
                const embed = new Discord.MessageEmbed()
                .setColor('#1ed3ec')
                .setTitle(`Manga encontrado!  :heart:  |   Titulo: ${response.title}`)
                .addField('Más informacion:', response.url)
                .addField('Tipo: ', response.type)
                .setDescription(response.syn)
                .addField('Volumenes: ', response.volumes)
                .addField('Capitulos: ', response.chapters)
                .setImage(response.image_url)
                .setFooter(response.score, 'http://www.rw-designer.com/icon-image/1461-256x256x8.png')
                message.channel.send(embed)
            }catch(err){
                console.log(err)
                message.channel.send('Algo salio mal... :cry:')
            }

        }
        let query = [args]
        console.log(query)
        loadManga(verifyQuery(query))
    } else if (command === `${prefix}8ball`){
        message.channel.send(ball.rollBall(args))
    }
});

function verifyQuery(query){
    let array = query;

    const filterArr = array.filter(elm => elm)

    if(filterArr.length === 0){
        return 'Tienes que ingresar parametro de busqueda.'
    }else {
        return filterArr;
    }

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