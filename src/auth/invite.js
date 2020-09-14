const express = require('express');
const router = express.Router()
const SCOPES = 'bot identify guilds guilds.join'


require('dotenv').config()

const axios = require('axios').default

const redirect_uri = process.env.REDIRECT_URI

const discordInviteURL = 'https://discord.com/oauth2/authorize'


router.get('/', (req, res) => {
    const qs = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        scope: SCOPES,
    })
    const redirect = `${discordInviteURL}?${qs}`
    res.redirect(redirect)
})





module.exports = router
