
const {Game, Review, User} = require('../models/index')

class ControllerGame{

    static giveRating(req, res){
        Review
        .create(req.body)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static giveRatingForm(req, res){
        Game
        .findById(req.params.id)
        .then(showGameById => {
            // res.render('game', {showGameById, session : req.session})
            Game
            .findAll({
                include : { model : User},
                where : { id : req.params.id}
            })
            .then(showAllRatingAndComment => {
                res.render('game', {showGameById, session : req.session, showAllRatingAndComment})
                // res.send(showAllRatingAndComment)
            })
        })
        .catch(err => {
            res.send(err)
        })
    }




    static showAllGames(req,res) {
        // res.send('aaa')
        let q = {}
        if (req.query.title) {            
            q = { where: {
                title: req.query.title
            }}

            console.log(q)
        }
        Game.findAll(q)
            .then(games => {
                res.render('gameHome', {games: games, user: 'admin' })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = ControllerGame
