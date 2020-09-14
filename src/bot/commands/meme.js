const axios = require('axios').default

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

module.exports = {
    getMeme
}