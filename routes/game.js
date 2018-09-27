const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/game')

router.get('/', Controller.showAllGames)
router.get('/:id', Controller.giveRatingForm)
router.post('/:id', Controller.giveRating)

module.exports = router