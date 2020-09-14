const axios = require('axios').default


async function getBoobs(){
    const response = await axios.get("https://meme-api.herokuapp.com/gimme/boobs/2")
    .then(({ data }) => {
        let res = data.memes[0].url
        return res
    })
    .catch(error=>{
    console.log(error);
    });
    
    return response;
} 

async function getHentai(){
    const response = await axios.get("https://meme-api.herokuapp.com/gimme/hentai/2")
    .then(({ data }) => {
        let res = data.memes[0].url
        return res
    })
    .catch(error=>{
    console.log(error);
    });
    
    return response;
} 


module.exports = {
    getBoobs,
    getHentai
}

