const API = require('animeflv-scrapper')
const jikanjs = require('jikanjs')



async function searchAnime(query){



    query = `${query}` ||  `${query[0]} ${query[1]}`

    const response = await jikanjs.search('anime', query, 1, {}, 1).then((result) => {
        
        let res = {
            url: result.results[0].url,
            image: result.results[0].image_url,
            title: result.results[0].title,
            syn: result.results[0].synopsis,
            score: result.results[0].score,
            ep: result.results[0].episodes,
            link: `https://animeflv.net`
        }


        return res

    })
    .catch(err => {
        console.log(err)
        return 'Error!'
    })
    
    
    return response
    
    
}

async function searchAnimeFLV(title){
    

    let response = API.searchAnime(title)
    .then(([data]) => {
        
        if(data === undefined){
            return undefined
        }

        return data.link

    })
    if(response === undefined){
        return 'error al obtener'
    }
    return response
}

async function searchManga(query){
    
    query = `${query}` ||  `${query[0]} ${query[1]}`
    const response = await jikanjs.search('manga', query, 1, {}, 2)
    .then((data) => {
        console.log(data)
        let res = {
            url:  data.results[0].url,
            image_url: data.results[0].image_url,
            type: data.results[0].type,
            score: data.results[0].score,
            volumes: data.results[0].volumes, 
            title: data.results[0].title,
            chapters: data.results[0].chapters,
            syn: data.results[0].synopsis
        }
        return res
    })
    .catch((err) => {
        console.log(err)
        return 'Error!'
    })
    return response
}

module.exports = {
    searchAnime,
    searchManga,
    searchAnimeFLV

}