const express = require('express');
const router = express.Router()
const SCOPES = 'bot identify guilds guilds.join'


require('dotenv').config()

const axios = require('axios').default

const discordAuthUrl = 'https://discord.com/api/oauth2/authorize';
const redirect_uri = process.env.REDIRECT_URI

const discordAuthBase = 'https://discord.com/api/oauth2'
const authApi = axios.create({
    baseURL: discordAuthBase,
    headers: {
        'Content-Type': 'x-www-form-urlencoded'
    }
})




router.get('/', (req, res) => {
    const qs = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri,
        permissions: '8',
        scope: SCOPES,
        prompt: 'consent'
    })
    
    const redirectUrl = `${discordAuthUrl}?${qs}`

    res.redirect(redirectUrl)


})


router.get('/callback', async (req, res) => {
    
   
    
    const qs = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        grant_type: 'code',
        scope: SCOPES,
        redirect_uri
    })
    
    try{
        await authApi.post(`/token${qs}`)
        
        
    } catch (err) {
        res.json({
            error: 'Error!'
        })
        console.error(err)
    }
    

})


module.exports = router
