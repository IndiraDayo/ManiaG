const GameModel = require('../models/index').Game

class Controller {
    static showAllGames(req,res) {
        // res.send('aaa')
        let q = {}
        if (req.query.title) {            
            q = { where: {
                title: req.query.title
            }}

            console.log(q)
        }
        GameModel.findAll(q)
            .then(games => {
                res.render('gameHome', {games: games, user: 'admin' })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

}

module.exports = Controller