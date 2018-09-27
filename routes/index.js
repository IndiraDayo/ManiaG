const router = require('express').Router()
const auth = require('../helpers/authentification')
const Controller = require('../controllers/index')


router.get('/', auth, (req, res) => {
    res.render('index', {session : req.session})
})

router.get('/:username/games', Controller.userActivity)

module.exports = router