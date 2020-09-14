const express = require('express');
const app = express();

const cors = require('cors')
const volleyball = require('volleyball')
const helmet = require('helmet')



app.use(cors())
app.use(helmet())
app.use(volleyball)
app.use(express.json())


const bot = require('./bot/bot')
bot.init();


const port = process.env.PORT || 3000
app.listen(port, (req, res) => {

    console.log(`Escuchando en el puerto ${port}`)
})

app.get('/', (req, res) => {
  res.json({
      response: 'Main Page'
  })
})



// app.use('/invite', require('./auth/invite'))
// app.use('/auth/authorize/callback', require('./auth/invite'))








// app.get('/about', (req, res) => {
//     res.json({
//         message: 'si'
//     })
// })



