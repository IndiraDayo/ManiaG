const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use( express.static( "public" ) );
app.use('/css', express.static('public/css'))
app.use('/img', express.static('public/img'))


const routerGame = require('./routes/game')

app.use('/', routerGame)
app.use('/game', routerGame)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))