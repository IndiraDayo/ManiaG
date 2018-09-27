const express = require('express'),
      router = express.Router(),
      Controller = require('../controllers/game')


router
    .get('/', Controller.showAllGames)



module.exports = router