const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const auth = require("./helpers/authentification");
const routes = require('./routes/index')
const {User} = require('./models/index')
const Controller = require('./controllers/index')


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use( express.static( "public" ) );
app.use('/css', express.static('public/css'))
app.use('/img', express.static('public/img'))


const session = require('express-session')
app.use(session({
    key: 'key_user',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


app.get("/login",function(req, res){
    res.render('loginPage')
})

app.post('/login', (req,res) => {
    User.findOne({
        where : { 
            email : req.body.email,
            password : req.body.password
        }
    })
    .then(getId => {
        req.session.user = {
            name : getId.username,
            user_id : getId.id,
            role : getId.role
        }
        if(getId.role === 'user'){
            res.redirect('/')
        }
        else if(getId.role === 'admin'){
            res.redirect('/admin')

        }
    })
    .catch(err => {
        res.send(err.message)
    })
})

app.get('/register', (req, res) => {
    res.render('registerPage')

})
app.post('/register', (req, res) => {
    User.create(req.body)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.send(err.message)
    })
})

app.get('/admin', auth, Controller.adminRole)

app.get('/logout' , (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.send(err)
        }
        else{
            res.redirect('/')
        }
    })
})


const routerGame = require('./routes/game')
app.locals.helpers = require('./helpers/index')

app.use('/', auth, routerGame) // ini harus di ubah jadi ke bawah
app.use('/game', auth, routerGame)

app.use('/', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))