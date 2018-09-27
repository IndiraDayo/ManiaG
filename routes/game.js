const router = require('express').Router()
const Controller = require('../controllers/game')

router.get('/', (req, res)=> {
    res.send('ini  game dashboard')
})

router.get('/:id', Controller.giveRatingForm)
router.post('/:id', Controller.giveRating)

module.exports = router