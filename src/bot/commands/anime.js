const jikanjs = require('jikanjs')

async function searchAnime(fquery, squery, type){
    let t = 'anime';
    if(type){
      t = type;
    } else {
        t = 'anime';  
    }
    
    let fnquery = `${fquery} ${squery}`
    if(squery === undefined){
        t = 'anime'
        fnquery = `${fquery}`;
        if(squery === 'anime' || squery === 'manga'){
            squery = t;
        }
    }
    

    


    if(!t){
        if(fquery === undefined){
            return 'Parametro de busqueda obligatorio!'
            
        } else {
            fnquery;
        }

    }

    // console.log(t, q)
    const response = await jikanjs.search(t, fnquery, 1, {}, 1).then((result) => {
        
        
        let res = {
            url: result.results[0].url,
            image: result.results[0].image_url,
            title: result.results[0].title,
            syn: result.results[0].synopsis,
            score: result.results[0].score,
            ep: result.results[0].episodes

        }
        return res
        // const data = {
        //     img: image_url,
        //     url: url,
        //     title: title
        // }
        

        // return data
    })
    return response
    
}


module.exports = {
    searchAnime
}