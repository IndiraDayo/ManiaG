const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/game')

router.get('/', Controller.showAllGames)
router.get('/:id', Controller.giveRatingForm)
router.post('/:id', Controller.giveRating)

router.get('/:id/edit', Controller.editGameGetId)
router.post('/:id/edit', Controller.editGame)

router.get('/:id/delete', Controller.deleteGame)


module.exports = router